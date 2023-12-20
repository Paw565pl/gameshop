from django import forms
from django.contrib import admin

from core.mixins import ExportCsvMixin
from .models import Game


# Register your models here.
class CommonAdmin(admin.ModelAdmin, ExportCsvMixin):
    actions = ["export_as_csv"]
    list_display = ["name"]


class GameAdminForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["screenshots"].required = False
        self.fields["reviews"].required = False


@admin.register(Game)
class GameAdmin(CommonAdmin):
    form = GameAdminForm
    search_fields = ["name__icontains", "slug__icontains"]
    list_filter = ["genres", "platforms", "developers"]
