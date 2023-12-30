from rest_framework import exceptions

from .models import Game


def check_if_game_exists(game_id: int):
    game = Game.objects.filter(pk=game_id).count() != 0

    if not game:
        raise exceptions.NotFound("Game not found")
