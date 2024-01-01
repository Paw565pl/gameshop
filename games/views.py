from rest_framework import viewsets, mixins, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .filters import GameFilter
from .models import Game, Review, Screenshot, Genre, Platform, Developer
from .permissions import IsAuthorOrReadOnly
from .serializers import (
    GameSerializer,
    ReviewSerializer,
    ScreenshotSerializer,
    GenreSerializer,
    PlatformSerializer,
    DeveloperSerializer,
    AddFavouriteGameSerializer,
    DetailGenreSerializer,
    DetailPlatformSerializer,
    DetailDeveloperSerializer,
)
from .utils import check_if_game_exists


# Create your views here.
class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action == "retrieve":  # noqa
            return DetailGenreSerializer
        return GenreSerializer


class PlatformViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Platform.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action == "retrieve":  # noqa
            return DetailPlatformSerializer
        return PlatformSerializer


class DeveloperViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Developer.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action == "retrieve":  # noqa
            return DetailDeveloperSerializer
        return DeveloperSerializer

    @action(detail=False, methods=["get"], url_path="average-metacritic")
    def average_metacritic(self, request):
        pipeline = [
            {"$unwind": "$developers_id"},
            {
                "$group": {
                    "_id": "$developers_id",
                    "average_metacritic": {"$avg": "$metacritic"},
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "id": "$_id",
                    "average_metacritic": {"$round": ["$average_metacritic", 2]},
                }
            },
            {"$sort": {"id": 1}},
        ]
        result = Game.objects.mongo_aggregate(pipeline)
        return Response(result)


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


class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.order_by("id")
    serializer_class = GameSerializer
    filterset_class = GameFilter
    ordering_fields = ["name", "released", "metacritic", "price"]

    @action(detail=False, methods=["get"], url_path="released-per-year")
    def released_per_year(self, request):
        pipeline = [
            {"$group": {"_id": {"$year": "$released"}, "games_count": {"$sum": 1}}},
            {"$project": {"year": "$_id", "games_count": 1, "_id": 0}},
            {"$sort": {"year": -1}},
        ]
        result = Game.objects.mongo_aggregate(pipeline)
        return Response(result)


class FavouriteGameViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        favourite_games = user.favourite_games.all().order_by("-id")
        return favourite_games

    def get_serializer_class(self):
        if self.action == "create":  # noqa
            return AddFavouriteGameSerializer
        return GameSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        game = serializer.save()

        serialized_game_data = GameSerializer(game).data

        headers = self.get_success_headers(serializer.data)
        return Response(
            serialized_game_data, status=status.HTTP_201_CREATED, headers=headers
        )

    def destroy(self, request, *args, **kwargs):
        user = self.request.user
        game = self.get_object()

        user.favourite_games.remove(game)

        return Response(status=status.HTTP_204_NO_CONTENT)
