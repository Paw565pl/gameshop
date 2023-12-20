from rest_framework import viewsets, permissions

from .filters import GameFilter
from .models import Game, Review, Screenshot
from .permissions import IsAuthorOrReadOnly
from .serializers import GameSerializer, ReviewSerializer, ScreenshotSerializer
from .utils import check_if_game_exists


# Create your views here.
class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.order_by("id")
    serializer_class = GameSerializer
    filterset_class = GameFilter
    ordering_fields = ["name", "released", "metacritic", "price"]


class ScreenshotViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ScreenshotSerializer

    def get_queryset(self):
        game_id = self.kwargs["game_pk"]
        check_if_game_exists(game_id)

        return Screenshot.objects.filter(game__id=game_id).order_by("id")


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        game_id = self.kwargs["game_pk"]
        check_if_game_exists(game_id)

        return Review.objects.filter(game__id=game_id).order_by("id")

    def create(self, request, *args, **kwargs):
        game_id = self.kwargs["game_pk"]
        check_if_game_exists(game_id)

        return super().create(request, *args, **kwargs)
