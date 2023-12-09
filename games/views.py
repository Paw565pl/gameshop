from rest_framework import viewsets, mixins

from .models import Game
from core.pagination import StandardPagination
from .serializers import GameSerializer


# Create your views here.
class GameViewSet(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = StandardPagination
