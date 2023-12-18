from rest_framework import serializers

from .models import Game, Genre, Platform, Developer, Screenshot, Review


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
        game = Game.objects.get(pk=game_id)

        has_review = game.reviews.filter(author=username).count() != 0
        if has_review:
            raise serializers.ValidationError(
                "You have already added a review for this game."
            )

        new_review = Review.objects.create(author=username, **validated_data)
        game.reviews.add(new_review)
        game.save()
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
            "genres",
            "platforms",
            "developers",
        ]
