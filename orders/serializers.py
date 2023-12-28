from rest_framework import serializers

from games.serializers import SimpleGameSerializer
from orders.models import Cart, Item


class ItemSerializer(serializers.ModelSerializer):
    game = SimpleGameSerializer(read_only=True)

    @staticmethod
    def get_total_price(item: Item):
        unit_price = item.game.first().price
        return round(unit_price * item.quantity, 2)

    class Meta:
        model = Item
        fields = ["id", "game", "quantity", "total_price"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "items"]
