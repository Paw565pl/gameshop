from rest_framework import exceptions

from .models import Game


def check_if_game_exists(game_id: int):
    game = Game.objects.filter(pk=game_id).count()

    if game == 0:
        raise exceptions.NotFound()
