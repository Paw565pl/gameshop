from rest_framework import viewsets, mixins, permissions
from rest_framework.exceptions import NotFound

from .filters import GameFilter
from .models import Game, Review
from .permissions import IsAuthorOrReadOnly
from .serializers import GameSerializer, ReviewSerializer


# Create your views here.
class GameViewSet(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filterset_class = GameFilter
    ordering_fields = ["name", "released", "metacritic"]


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        game_id = self.kwargs["game_pk"]
        game = Game.objects.filter(pk=game_id).count()

        if game == 0:
            raise NotFound()

        return Review.objects.filter(game__id=game_id)
