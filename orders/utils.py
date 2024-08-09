from rest_framework import exceptions

from .models import Cart


def check_if_cart_exists(cart_id: int):
    cart = Cart.objects.filter(pk=cart_id).count() != 0

    if not cart:
        raise exceptions.NotFound("Cart not found.")
