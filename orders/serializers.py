from rest_framework import serializers

from games.models import Game
from games.serializers import SimpleGameSerializer
from orders.models import Cart, Item


class ItemSerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_game(item: Item):
        game = item.game.first()  # noqa
        serialized_game = SimpleGameSerializer(game).data
        return serialized_game

    @staticmethod
    def get_total_price(item: Item):
        unit_price = item.game.first().price  # noqa
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
        fields = ["id", "items"]
