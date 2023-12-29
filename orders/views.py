from rest_framework import viewsets, permissions, mixins
from orders.models import Cart, Item, Order, Address, SupportTicket
from orders.serializers import (
    CartSerializer,
    ItemSerializer,
    AddItemSerializer,
    OrderSerializer,
    AddressSerializer,
    SupportTicketSerializer,
    CreateSupportTicketSerializer,
)


# Create your views here.
class CartViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
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
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        user_id = self.request.user.id
        orders = Order.objects.filter(user__id=user_id).order_by("id")
        return orders


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        address = Address.objects.filter(user__id=user_id).order_by("id")
        return address


class SupportTicketViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        support_tickets = SupportTicket.objects.filter(user__id=user_id).order_by("id")
        return support_tickets

    def get_serializer_class(self):
        if self.action == "create":
            return CreateSupportTicketSerializer
        return SupportTicketSerializer
