from rest_framework import viewsets, permissions, mixins

from orders.models import Cart, Item
from orders.serializers import CartSerializer, ItemSerializer, AddItemSerializer


# Create your views here.
class CartViewSet(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        cart_id = self.kwargs["cart_pk"]
        return Item.objects.filter(cart__id=cart_id).order_by("id")

    def get_serializer_class(self):
        if self.action == "create":
            return AddItemSerializer
        return ItemSerializer
