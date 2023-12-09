from rest_framework import viewsets, mixins

from core.pagination import StandardPagination
from .filters import GameFilter
from .models import Game
from .serializers import GameSerializer


# Create your views here.
class GameViewSet(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = StandardPagination
    filterset_class = GameFilter
    ordering_fields = ["name", "likes", "released", "metacritic"]
