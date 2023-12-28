from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response

from orders.models import Cart, User, Item
from orders.serializers import CartSerializer, ItemSerializer, AddItemSerializer


# Create your views here.
class CartViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        cart_id = User.objects.get(id=user_id).shopping_cart.first().id
        return Response({"id": cart_id})


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
