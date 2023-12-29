from rest_framework import serializers
from django.db import transaction

from games.models import Game, Platform
from games.serializers import SimpleGameSerializer, PlatformSerializer
from orders.models import Cart, Item, Order


class ItemSerializer(serializers.ModelSerializer):
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

    class Meta:
        model = Item
        fields = ["id", "game", "platform", "quantity", "total_price"]


class AddItemSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField()
    platform_id = serializers.IntegerField()

    def save(self, **kwargs):
        cart_id = self.context["view"].kwargs["cart_pk"]
        game_id = self.validated_data["game_id"]
        platform_id = self.validated_data["platform_id"]
        quantity = self.validated_data["quantity"]

        try:
            game = Game.objects.get(pk=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError("Invalid game id.")

        try:
            platform = game.platforms.get(pk=platform_id)
        except Platform.DoesNotExist:
            raise serializers.ValidationError("Invalid platform id.")

        existing_item = Item.objects.filter(
            cart__id=cart_id, game__id=game_id, platform__id=platform_id
        )
        if existing_item.count() != 0:
            existing_item_instance = existing_item.get()
            existing_item_instance.quantity += quantity
            existing_item_instance.save()

            return existing_item_instance

        item = Item(quantity=quantity)
        item.game.add(game)
        item.platform.add(platform)
        item.save()

        cart = Cart.objects.get(id=cart_id)
        cart.items.add(item)
        cart.save()

        return item

    class Meta:
        model = Item
        fields = ["id", "game_id", "platform_id", "quantity"]


class CartSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_total_price(cart: Cart):
        total_price = 0
        cart_items = list(cart.items.all())  # noqa
        for item in cart_items:
            calculated_price = item.game.get().price.to_decimal() * item.quantity
            total_price += calculated_price
        return str(total_price)

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


class OrderSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    status = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    total_price = serializers.DecimalField(
        read_only=True, max_digits=10, decimal_places=2
    )

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

        cart_items = cart.items.all()
        total_price = CartSerializer.get_total_price(cart)

        cart.delete()
        order = Order.objects.create(total_price=total_price)
        order.items.add(*cart_items)
        user.orders.add(order)

        return order

    class Meta:
        model = Order
        fields = ["id", "items", "status", "created_at", "updated_at", "total_price"]
