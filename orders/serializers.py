from rest_framework import serializers
from django.db import transaction

from games.models import Game
from games.serializers import SimpleGameSerializer
from orders.models import Cart, Item, Order


class ItemSerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_game(item: Item):
        game = item.game.get()  # noqa
        serialized_game = SimpleGameSerializer(game).data
        return serialized_game

    @staticmethod
    def get_total_price(item: Item):
        unit_price = item.game.get().price  # noqa
        return str(unit_price.to_decimal() * item.quantity)

    class Meta:
        model = Item
        fields = ["id", "game", "quantity", "total_price"]


class AddItemSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField()

    def save(self, **kwargs):
        cart_id = self.context["view"].kwargs["cart_pk"]
        game_id = self.validated_data["game_id"]
        quantity = self.validated_data["quantity"]

        try:
            game = Game.objects.get(pk=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError("Invalid game id.")

        item = Item(quantity=quantity)
        item.game.add(game)
        item.save()

        cart = Cart.objects.get(id=cart_id)
        cart.items.add(item)
        cart.save()

        return item

    class Meta:
        model = Item
        fields = ["id", "game_id", "quantity"]


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
    placed_at = serializers.DateTimeField(read_only=True)
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
        fields = ["id", "items", "status", "placed_at", "total_price"]
