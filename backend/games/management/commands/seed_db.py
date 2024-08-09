import json

from django.core.management.base import BaseCommand, CommandError
from tqdm import tqdm

from games.models import Game, Genre, Platform, Developer, Screenshot


class Command(BaseCommand):
    help = "seeds database with the sample data"

    def handle(self, *args, **options):
        self.stdout.write("seeding the database...")

        try:
            with open("./data/data.json", "r") as f:
                games_json = json.load(f)

            games_objects = []

            for game in tqdm(games_json):
                array_reference_fields = [
                    "genres",
                    "platforms",
                    "developers",
                    "screenshots",
                ]
                filtered_game = {
                    k: v for k, v in game.items() if k not in array_reference_fields
                }

                game_obj = Game(**filtered_game)

                genres_list = []
                for genre in game["genres"]:
                    genre_obj, created = Genre.objects.get_or_create(
                        name=genre["name"], slug=genre["slug"]
                    )

                    if created:
                        genre_obj.background_image = genre["background_image"]
                        genre_obj.save()

                    genres_list.append(genre_obj)

                platforms_list = [
                    Platform.objects.get_or_create(**platform)[0]
                    for platform in game["platforms"]
                ]

                developers_list = [
                    Developer.objects.get_or_create(**developer)[0]
                    for developer in game["developers"]
                ]

                screenshots_list = [
                    Screenshot.objects.get_or_create(**screenshot)[0]
                    for screenshot in game["screenshots"]
                ]

                game_obj.genres.add(*genres_list)
                game_obj.platforms.add(*platforms_list)
                game_obj.developers.add(*developers_list)
                game_obj.screenshots.add(*screenshots_list)

                games_objects.append(game_obj)

            Game.objects.bulk_create(games_objects)

        except Exception as e:
            raise CommandError(f"something went wrong! {e}")

        self.stdout.write("done!")
