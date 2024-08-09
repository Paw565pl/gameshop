from django.db import transaction
from rest_framework import serializers

from .models import Game, Genre, Platform, Developer, Screenshot, Review


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class DetailGenreSerializer(GenreSerializer):
    games_count = serializers.SerializerMethodField()

    @staticmethod
    def get_games_count(obj):
        count = Game.objects.filter(genres__name=obj.name).count()
        return count


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = "__all__"


class DetailPlatformSerializer(PlatformSerializer):
    games_count = serializers.SerializerMethodField()

    @staticmethod
    def get_games_count(obj):
        count = Game.objects.filter(platforms__name=obj.name).count()
        return count


class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = "__all__"


class DetailDeveloperSerializer(DeveloperSerializer):
    games_count = serializers.SerializerMethodField()

    @staticmethod
    def get_games_count(obj):
        count = Game.objects.filter(developers__name=obj.name).count()
        return count


class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.CharField(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"

    @transaction.atomic()
    def create(self, validated_data):
        username = self.context["request"].user.username
        game_id = self.context["view"].kwargs["game_pk"]

        try:
            game = Game.objects.get(pk=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError("Game not found.")

        has_review = game.reviews.filter(author=username).count() != 0
        if has_review:
            raise serializers.ValidationError(
                "You have already added a review for this game."
            )

        new_review = Review.objects.create(author=username, **validated_data)
        game.reviews.add(new_review)

        return new_review


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    platforms = PlatformSerializer(many=True)
    developers = DeveloperSerializer(many=True)

    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "name_original",
            "slug",
            "released",
            "metacritic",
            "background_image",
            "website",
            "description_raw",
            "price",
            "genres",
            "platforms",
            "developers",
        ]


class SimpleGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "slug",
            "released",
            "background_image",
            "price",
        ]


class AddFavouriteGameSerializer(GameSerializer):
    game_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        user = self.context["request"].user
        game_id = validated_data["game_id"]

        try:
            game = Game.objects.get(pk=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError("Game not found.")

        has_game = user.favourite_games.filter(pk=game_id).count() != 0
        if has_game:
            raise serializers.ValidationError("Game already added to favourites.")

        user.favourite_games.add(game)
        return game

    class Meta:
        model = Game
        fields = ["game_id"]
