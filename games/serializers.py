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
    class Meta:
        model = Review
        fields = "__all__"


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
