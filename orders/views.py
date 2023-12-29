from rest_framework import viewsets, permissions, mixins
from orders.models import Cart, Item, Order
from orders.serializers import (
    CartSerializer,
    ItemSerializer,
    AddItemSerializer,
    OrderSerializer,
)


# Create your views here.
class CartViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        cart = Cart.objects.filter(user__id=user_id).order_by("id")
        return cart


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cart_id = self.kwargs["cart_pk"]
        user_id = self.request.user.id
        return Item.objects.filter(cart__id=cart_id, cart__user__id=user_id).order_by(
            "id"
        )

    def get_serializer_class(self):
        if self.action == "create":
            return AddItemSerializer
        return ItemSerializer


class OrderViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering_fields = ["placed_at"]
    ordering = ["-placed_at"]

    def get_queryset(self):
        user_id = self.request.user.id
        orders = Order.objects.filter(user__id=user_id).order_by("id")
        return orders
