from rest_framework import viewsets, permissions, mixins

from games.utils import check_if_support_ticket_exists
from orders.models import (
    Cart,
    Item,
    Order,
    Address,
    SupportTicket,
    SupportTicketMessage,
)
from orders.serializers import (
    CartSerializer,
    ItemSerializer,
    OrderSerializer,
    AddressSerializer,
    SupportTicketSerializer,
    SupportTicketMessageSerializer,
)
from orders.utils import check_if_cart_exists


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

        check_if_cart_exists(cart_id)
        return Item.objects.filter(cart__id=cart_id, cart__user__id=user_id).order_by(
            "id"
        )

    def create(self, request, *args, **kwargs):
        cart_id = self.kwargs["cart_pk"]
        check_if_cart_exists(cart_id)

        return super().create(request, *args, **kwargs)


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
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        support_tickets = SupportTicket.objects.filter(user__id=user_id).order_by("id")
        return support_tickets


class SupportTicketMessageViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = SupportTicketMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cart_id = self.kwargs["support_ticket_pk"]

        check_if_support_ticket_exists(cart_id)
        return SupportTicketMessage.objects.filter(supportticket__id=cart_id).order_by(
            "id"
        )
