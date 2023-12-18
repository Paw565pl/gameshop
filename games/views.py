from rest_framework import viewsets, permissions, exceptions

from .filters import GameFilter
from .models import Game, Review, Screenshot
from .permissions import IsAuthorOrReadOnly
from .serializers import GameSerializer, ReviewSerializer, ScreenshotSerializer


# Create your views here.
class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filterset_class = GameFilter
    ordering_fields = ["name", "released", "metacritic"]


class ScreenshotViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ScreenshotSerializer

    def get_queryset(self):
        game_id = self.kwargs["game_pk"]
        game = Game.objects.filter(pk=game_id).count()

        if game == 0:
            raise exceptions.NotFound()

        return Screenshot.objects.filter(game__id=game_id)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        game_id = self.kwargs["game_pk"]
        game = Game.objects.filter(pk=game_id).count()

        if game == 0:
            raise exceptions.NotFound()

        return Review.objects.filter(game__id=game_id)
