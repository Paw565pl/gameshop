from re import match
from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from games.models import Game, Platform
from games.serializers import SimpleGameSerializer, PlatformSerializer
from orders.models import (
    Cart,
    Item,
    Order,
    Address,
    SupportTicket,
    SupportTicketMessage,
)


class ItemSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    platform_id = serializers.IntegerField(write_only=True)

    game = serializers.SerializerMethodField(read_only=True)
    platform = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_game(item: Item):
        game = item.game.get()  # noqa
        serialized_game = SimpleGameSerializer(game).data
        return serialized_game

    @staticmethod
    def get_platform(item: Item):
        platform = item.platform.get()  # noqa
        serialized_platform = PlatformSerializer(platform).data
        return serialized_platform

    @staticmethod
    def get_total_price(item: Item):
        unit_price = item.game.get().price  # noqa
        return str(unit_price.to_decimal() * item.quantity)

    def create(self, validated_data):
        cart_id = self.context["view"].kwargs["cart_pk"]
        game_id = validated_data["game_id"]
        platform_id = validated_data["platform_id"]
        quantity = validated_data["quantity"]

        try:
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            raise serializers.ValidationError("Invalid cart id.")

        try:
            game = Game.objects.get(pk=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError("Invalid game id.")

        try:
            platform = game.platforms.get(pk=platform_id)
        except Platform.DoesNotExist:
            raise serializers.ValidationError("Invalid platform id.")

        item_in_cart = Item.objects.filter(
            cart__id=cart_id, game__id=game_id, platform__id=platform_id
        )
        if item_in_cart.count() != 0:
            existing_item_instance = item_in_cart.get()
            existing_item_instance.quantity += quantity
            existing_item_instance.save()

            return existing_item_instance

        item = Item(quantity=quantity)
        item.game.add(game)
        item.platform.add(platform)
        item.save()

        cart.items.add(item)
        return item

    class Meta:
        model = Item
        fields = [
            "id",
            "game",
            "platform",
            "quantity",
            "total_price",
            "game_id",
            "platform_id",
        ]


class CartSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_total_price(cart: Cart):
        total_price = 0
        cart_items = cart.items.all()  # noqa
        for item in cart_items:
            calculated_price = item.game.get().price.to_decimal() * item.quantity
            total_price += calculated_price
        return str(total_price)

    @transaction.atomic()
    def create(self, validated_data):
        user = self.context["request"].user

        has_cart = user.cart.count() != 0
        if has_cart:
            raise serializers.ValidationError("You have already created a cart.")

        cart = Cart.objects.create()
        user.cart.add(cart)

        return cart

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price"]


class AddressSerializer(serializers.ModelSerializer):
    @transaction.atomic()
    def create(self, validated_data):
        user = self.context["request"].user

        has_address = user.address.count() != 0
        if has_address:
            raise serializers.ValidationError("You have already created an address.")

        address = Address.objects.create(**validated_data)
        user.address.add(address)

        return address

    class Meta:
        model = Address
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    status = serializers.CharField(read_only=True)
    address = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.DecimalField(
        read_only=True, max_digits=10, decimal_places=2
    )

    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    @staticmethod
    def validate_promo_code(promo_code: str):
        if promo_code == "":
            return None

        pattern = r"^PROM_[A-Z0-9]{5}$"
        if not match(pattern, promo_code):
            raise serializers.ValidationError("Invalid promo code.")
        return promo_code

    @staticmethod
    def get_address(order: Order):
        address = order.address.get()  # noqa
        serialized_address = AddressSerializer(address).data
        return serialized_address

    @transaction.atomic()
    def create(self, validated_data):
        user = self.context["request"].user
        user_id = user.id

        try:
            cart = user.cart.get(user__id=user_id)
        except Cart.DoesNotExist:
            raise serializers.ValidationError("You have no cart.")

        if cart.items.count() == 0:
            raise serializers.ValidationError("Your cart is empty.")

        try:
            address = user.address.get(user__id=user_id)
        except Address.DoesNotExist:
            raise serializers.ValidationError("You have no address.")

        cart_items = cart.items.all()
        total_price = CartSerializer.get_total_price(cart)

        promo_code = validated_data.get("promo_code")
        if promo_code:
            total_price = str(round(Decimal(total_price) * Decimal(0.97), 2))

        cart.delete()
        order = Order.objects.create(total_price=total_price, promo_code=promo_code)

        order.items.add(*cart_items)
        order.address.add(address)
        user.orders.add(order)

        return order

    class Meta:
        model = Order
        fields = [
            "id",
            "items",
            "status",
            "address",
            "promo_code",
            "total_price",
            "created_at",
            "updated_at",
        ]


class SupportTicketMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicketMessage
        fields = "__all__"


class SupportTicketSerializer(serializers.ModelSerializer):
    order_id = serializers.CharField(write_only=True)
    complaint = serializers.CharField(write_only=True)

    status = serializers.CharField(read_only=True)
    order = serializers.SerializerMethodField(read_only=True)
    messages = SupportTicketMessageSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    @staticmethod
    def get_order(support_ticket: SupportTicket):
        order = support_ticket.order.get()  # noqa
        serialized_order = OrderSerializer(order).data
        return serialized_order

    @transaction.atomic()
    def create(self, validated_data):
        user = self.context["request"].user
        username = user.username
        order_id = validated_data["order_id"]
        complaint = validated_data["complaint"]

        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            raise serializers.ValidationError("Invalid order id.")

        has_support_ticket_for_order = (
                SupportTicket.objects.filter(order__id=order_id).count() != 0
        )
        if has_support_ticket_for_order:
            raise serializers.ValidationError(
                "You have already created a support ticket for this order."
            )

        support_ticket_message = SupportTicketMessage()
        support_ticket_message.author = username
        support_ticket_message.message = complaint
        support_ticket_message.save()

        support_ticket = SupportTicket.objects.create()

        support_ticket.messages.add(support_ticket_message)
        support_ticket.order.add(order)
        user.support_tickets.add(support_ticket)

        return support_ticket

    class Meta:
        model = SupportTicket
        fields = [
            "id",
            "status",
            "order",
            "messages",
            "created_at",
            "updated_at",
            "order_id",
            "complaint",
        ]
