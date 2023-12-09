import json
from django.core.management.base import BaseCommand, CommandError
from games.models import Game, Genre, Platform, Developer


class Command(BaseCommand):
    help = "seeds database with the sample data"

    def handle(self, *args, **options):
        print("seeding the database...")

        try:
            with open("./data/data.json", "r") as f:
                games_objects = []
                genres_objects = []
                platforms_objects = []
                developers_objects = []

                games = json.load(f)

                for game in games:
                    genres_list = [
                        genres_objects.append(Genre(**genre))
                        for genre in game["genres"]
                    ]
                    platforms_list = [
                        platforms_objects.append(Platform(**platform))
                        for platform in game["platforms"]
                    ]
                    developers_list = [
                        developers_objects.append(Developer(**developer))
                        for developer in game["developers"]
                    ]

                    games_objects.append(Game(**game))

                Game.objects.bulk_create(games_objects)
                Genre.objects.bulk_create(list(set(genres_objects)))
                Platform.objects.bulk_create(list(set(platforms_objects)))
                Developer.objects.bulk_create(list(set(developers_objects)))

        except Exception as e:
            print(e)
            raise CommandError(
                "something went wrong! maybe there is already data in the database"
            )

        print("done!")
