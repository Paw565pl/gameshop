from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe
from djoser.serializers import UserSerializer

from core.mixins import ExportJsonMixin
from .models import (
    Order,
    SupportTicket,
    SupportTicketMessage,
    Item,
    Cart,
    Address,
    User,
)
from .serializers import OrderSerializer, SupportTicketSerializer, AddressSerializer


# Register your models here.
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ["id"]
    readonly_fields = ["game_link", "platform_link"]
    fieldsets = [
        (
            "General",
            {
                "fields": ["quantity", "game_link", "platform_link"],
            },
        ),
    ]

    @staticmethod
    def game_link(obj):
        game = obj.game.get()
        url = reverse("admin:games_game_change", args=[game.id])
        return mark_safe('<a href="{}">{}</a>'.format(url, game.name))

    @staticmethod
    def platform_link(obj):
        platform = obj.platform.get()
        url = reverse("admin:games_platform_change", args=[platform.id])
        return mark_safe('<a href="{}">{}</a>'.format(url, platform.name))


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id"]
    readonly_fields = ["items_links"]
    fieldsets = [
        (
            "General",
            {
                "fields": ["items_links"],
            },
        ),
    ]

    @staticmethod
    def items_links(obj):
        links = []
        items = obj.items.all()
        for item in items:
            inner_text = f"{item.game.get().name} ({item.platform.get().name})"
            url = reverse("admin:orders_item_change", args=[item.id])
            links.append('<a href="{}">{}</a><br/><br/>'.format(url, inner_text))
        return mark_safe("".join(links))


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = AddressSerializer
    actions = ["export_to_json"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = OrderSerializer
    actions = ["export_to_json"]
    list_display = ["id", "status"]
    list_filter = ["status", "created_at", "updated_at"]
    ordering = ["-created_at"]
    readonly_fields = [
        "created_at",
        "updated_at",
        "total_price",
        "items_links",
        "address_link",
    ]
    fieldsets = (
        (
            "General",
            {
                "fields": (
                    "total_price",
                    "status",
                    "items",
                    "items_links",
                    "address_link",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )

    @staticmethod
    def items_links(obj):
        links = []
        items = obj.items.all()
        for item in items:
            inner_text = f"{item.game.get().name} ({item.platform.get().name})"
            url = reverse("admin:orders_item_change", args=[item.id])
            links.append('<a href="{}">{}</a><br/><br/>'.format(url, inner_text))
        return mark_safe("".join(links))

    @staticmethod
    def address_link(obj):
        address_id = obj.address.get().id
        url = reverse("admin:orders_address_change", args=[address_id])
        return mark_safe('<a href="{}">{}</a>'.format(url, "Address"))


@admin.register(SupportTicketMessage)
class SupportTicketMessageAdmin(admin.ModelAdmin):
    list_display = ["id", "author", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["author__icontains"]
    ordering = ["-created_at"]


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = SupportTicketSerializer
    actions = ["export_to_json"]
    list_display = ["id", "status", "created_at", "updated_at"]
    list_filter = ["status", "created_at"]
    readonly_fields = ["created_at", "updated_at", "order_link", "messages_links"]
    ordering = ["-created_at"]
    fieldsets = (
        (
            "General Information",
            {"fields": ("order_link", "status", "messages", "messages_links")},
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @staticmethod
    def order_link(obj):
        order_id = obj.order.get().id
        url = reverse("admin:orders_order_change", args=[order_id])
        return mark_safe('<a href="{}">{}</a>'.format(url, "Order"))

    @staticmethod
    def messages_links(obj):
        links = []
        messages = obj.messages.all()
        for message in messages:
            url = reverse("admin:orders_supportticketmessage_change", args=[message.id])
            links.append('<a href="{}">{}</a><br/><br/>'.format(url, message.message))
        return mark_safe("".join(links))


@admin.register(User)
class UserAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = UserSerializer
    list_display = ["username"]
    list_filter = ["is_active", "is_staff", "is_superuser", "date_joined"]
    search_fields = ["username__icontains"]
    autocomplete_fields = ["favourites"]
    readonly_fields = [
        "address_link",
        "cart_link",
        "orders_links",
        "support_tickets_links",
    ]

    @staticmethod
    def address_link(obj):
        address_id = obj.address.get().id
        url = reverse("admin:orders_address_change", args=[address_id])
        return mark_safe('<a href="{}">{}</a>'.format(url, "Address"))

    @staticmethod
    def cart_link(obj):
        cart_id = obj.cart.get().id
        url = reverse("admin:orders_cart_change", args=[cart_id])
        return mark_safe('<a href="{}">{}</a>'.format(url, "Cart"))

    @staticmethod
    def orders_links(obj):
        links = []
        orders = obj.orders.all()
        for order in orders:
            url = reverse("admin:orders_order_change", args=[order.id])
            links.append(
                '<a href="{}">{}</a><br/><br/>'.format(url, f"Order {order.id}")
            )
        return mark_safe("".join(links))

    @staticmethod
    def support_tickets_links(obj):
        links = []
        support_tickets = obj.support_tickets.all()
        for support_ticket in support_tickets:
            url = reverse("admin:orders_supportticket_change", args=[support_ticket.id])
            links.append(
                '<a href="{}">{}</a><br/><br/>'.format(
                    url, f"Support Ticket {support_ticket.id}"
                )
            )
        return mark_safe("".join(links))
