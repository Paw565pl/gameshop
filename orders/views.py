from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response

from orders.models import Cart, CustomUser
from orders.serializers import CartSerializer


# Create your views here.
class CartViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        cart_id = CustomUser.objects.get(id=user_id).shopping_cart.first().id
        return Response({"id": cart_id})
