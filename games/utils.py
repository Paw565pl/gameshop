from rest_framework import exceptions

from orders.models import SupportTicket
from .models import Game


def check_if_game_exists(game_id: int):
    game = Game.objects.filter(pk=game_id).count() != 0

    if not game:
        raise exceptions.NotFound("Game not found.")


def check_if_support_ticket_exists(support_ticket_id: int):
    support_ticket = SupportTicket.objects.filter(pk=support_ticket_id).count() != 0

    if not support_ticket:
        raise exceptions.NotFound("Support ticket not found.")
