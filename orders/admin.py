from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from core.mixins import ExportJsonMixin
from .models import Order, SupportTicket, SupportTicketMessage
from .serializers import OrderSerializer, SupportTicketSerializer


# Register your models here.
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = OrderSerializer
    list_display = ["id", "status", "total_price", "created_at", "updated_at"]
    list_filter = ["status", "created_at"]
    readonly_fields = ["id", "created_at", "updated_at"]
    fieldsets = (
        ("General Information", {"fields": ("id", "status", "total_price")}),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin, ExportJsonMixin):
    serializer_class = SupportTicketSerializer
    list_display = ["id", "status", "created_at", "updated_at"]
    list_filter = ["status", "created_at"]
    readonly_fields = ["id", "created_at", "updated_at", "order_link"]
    fieldsets = (
        ("General Information", {"fields": ("id", "order_link", "status", "messages")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    @staticmethod
    def order_link(obj):
        order_id = obj.order.get().id
        url = reverse("admin:orders_order_change", args=[order_id])
        return mark_safe('<a href="{}">{}</a>'.format(url, "Order"))

    order_link.short_description = "Order"


admin.site.register(SupportTicketMessage)
