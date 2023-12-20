from django import forms
from django.contrib import admin

from core.mixins import ExportCsvMixin
from .models import Game, Genre, Platform, Developer


# Register your models here.
@admin.register(Genre, Platform, Developer)
class CommonAdmin(admin.ModelAdmin, ExportCsvMixin):
    actions = ["export_as_csv"]
    search_fields = ["name__icontains", "slug__icontains"]
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
    list_filter = ["genres", "platforms", "developers"]
