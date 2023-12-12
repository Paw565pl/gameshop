from rest_framework import serializers

from .models import Game, Genre, Platform, Developer, Screenshot, Review
from core.utils import get_mongo_collection


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = "__all__"


class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = "__all__"


class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.CharField(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"

    def create(self, validated_data):
        username = self.context["request"].user.username
        game_id = self.context["view"].kwargs["game_pk"]
        content = validated_data["content"]

        game_queryset = Game.objects.filter(pk=game_id)

        has_review = len(list(game_queryset.filter(reviews={"author": username}))) != 0
        if has_review:
            raise serializers.ValidationError("You have already added a review.")

        game = game_queryset.first()
        new_review = {
            "author": username,
            "content": content,
        }
        game.reviews.append(new_review)
        game.save()

        return new_review

    def update(self, instance, validated_data):
        username = self.context["request"].user.username
        game_id = int(self.context["view"].kwargs["game_pk"])
        new_content = validated_data.get("content")

        games_collection = get_mongo_collection("games_game")
        games_collection.update_one(
            {"id": game_id, "reviews.author": username},
            {"$set": {"reviews.$.content": new_content}},
        )
        updated_review = games_collection.find_one(
            {"id": game_id, "reviews.author": username}, {"reviews.$": 1}
        )["reviews"][0]

        return updated_review


class GameReviewSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Game
        fields = ["reviews"]


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    platforms = PlatformSerializer(many=True)
    developers = DeveloperSerializer(many=True)
    screenshots = ScreenshotSerializer(many=True)

    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "name_original",
            "slug",
            "likes",
            "released",
            "metacritic",
            "background_image",
            "website",
            "description_raw",
            "genres",
            "platforms",
            "developers",
            "screenshots",
        ]
