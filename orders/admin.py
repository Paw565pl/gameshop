from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from core.mixins import ExportJsonMixin
from .models import Order, SupportTicket, SupportTicketMessage, Item, Cart, Address
from .serializers import OrderSerializer, SupportTicketSerializer, AddressSerializer


# Register your models here.
@admin.register(Item, Cart)
class SimpleAdmin(admin.ModelAdmin):
    list_display = ["id"]


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = AddressSerializer
    list_display = ["first_name", "last_name"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = OrderSerializer
    list_display = ["id", "status"]
    list_filter = ["status", "created_at"]
    readonly_fields = [
        "id",
        "created_at",
        "updated_at",
        "total_price",
        "items_links",
        "address_link",
    ]
    fieldsets = (
        (
            "General Information",
            {
                "fields": (
                    "id",
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
            url = reverse("admin:orders_item_change", args=[item.id])
            links.append(
                '<a href="{}">{}</a><br/><br/>'.format(url, item.game.get().name)
            )
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
    list_display = ["id", "status", "created_at", "updated_at"]
    list_filter = ["status", "created_at"]
    readonly_fields = ["id", "created_at", "updated_at", "order_link", "messages_links"]
    fieldsets = (
        (
            "General Information",
            {"fields": ("id", "order_link", "status", "messages", "messages_links")},
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
