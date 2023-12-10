from rest_framework import viewsets, mixins, permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .filters import GameFilter
from .models import Game
from .permissions import IsAuthorOrReadOnly
from .serializers import GameSerializer, ReviewSerializer, GameReviewSerializer


# Create your views here.
class GameViewSet(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filterset_class = GameFilter
    ordering_fields = ["name", "likes", "released", "metacritic"]


class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_serializer_class(self):
        if self.action == "list":
            return GameReviewSerializer
        return ReviewSerializer

    def get_queryset(self):
        queryset = Game.objects.filter(pk=self.kwargs["game_pk"]).all()
        if len(list(queryset)) == 0:
            raise NotFound()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_response = self.paginator.get_paginated_response(
                serializer.data[0]["reviews"]
            )
            return Response(
                {
                    "count": len(serializer.data[0]["reviews"]),
                    "next": paginated_response.data["next"],
                    "previous": paginated_response.data["previous"],
                    "results": serializer.data[0]["reviews"],
                }
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data[0]["reviews"])

    def get_object(self):
        queryset = self.get_queryset()
        username_filter = self.kwargs[self.lookup_field]
        game = queryset.get(pk=self.kwargs["game_pk"])
        for review in game.reviews:
            if review["author"] == username_filter:
                return review
        raise NotFound()
