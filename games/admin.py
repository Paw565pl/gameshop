from django import forms
from django.contrib import admin

from core.mixins import ExportJsonMixin

from .models import Game, Genre, Platform, Developer
from .serializers import (
    GameSerializer,
    GenreSerializer,
    PlatformSerializer,
    DeveloperSerializer,
)


# Register your models here.
class CommonAdmin(admin.ModelAdmin, ExportJsonMixin):
    actions = ["export_to_json"]
    list_display = ["name"]
    ordering = ["id"]
    search_fields = ["name__icontains", "slug__icontains"]


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
    serializer_class = GameSerializer
    form = GameAdminForm
    list_filter = ["genres", "platforms", "developers"]


@admin.register(Genre)
class GenreAdmin(CommonAdmin):
    serializer_class = GenreSerializer


@admin.register(Platform)
class PlatformAdmin(CommonAdmin):
    serializer_class = PlatformSerializer


@admin.register(Developer)
class DeveloperAdmin(CommonAdmin):
    serializer_class = DeveloperSerializer
