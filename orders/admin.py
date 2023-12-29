from django.contrib import admin

from core.mixins import ExportJsonMixin
from .models import Order
from .serializers import OrderSerializer


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
