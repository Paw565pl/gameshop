from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from djongo import models
from django.core import validators
from core.fields import Decimal128Field

from games.models import Game

from .managers import CustomUserManager


# Create your models here.
class Item(models.Model):
    game = models.ArrayReferenceField(to=Game)
    quantity = models.PositiveIntegerField(validators=[validators.MinValueValidator(1)])
    total_price = Decimal128Field(max_digits=10, decimal_places=2)

    objects = models.DjongoManager()


class Order(models.Model):
    STATUS_CHOICES = [
        ("P", "Pending"),
        ("S", "In Shipment"),
        ("C", "Completed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    items = models.ArrayReferenceField(to=Item)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="P")
    placed_at = models.DateTimeField(auto_now_add=True)
    total_price = Decimal128Field(max_digits=10, decimal_places=2)

    objects = models.DjongoManager()


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    items = models.ArrayReferenceField(to=Item)

    objects = models.DjongoManager()


class SupportTicket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.ArrayReferenceField(to=Order)
    content = models.TextField()

    objects = models.DjongoManager()


class Address(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(
        validators=[validators.RegexValidator("^[0-9]{9}$", "Invalid phone number")]
    )
    street = models.CharField(max_length=255)
    street_number = models.CharField(max_length=255)
    flat_number = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255)
    post_code = models.CharField(
        max_length=6,
        validators=[
            validators.RegexValidator("^[0-9]{2}-[0-9]{3}$", "Invalid post code")
        ],
    )
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    objects = models.DjongoManager()


class CustomUser(AbstractUser):
    email = models.EmailField("email address", unique=True)
    first_name = None
    last_name = None

    favourites = models.ArrayReferenceField(to=Game)

    address = models.ArrayReferenceField(to=Address)
    shopping_cart = models.ArrayReferenceField(to=Cart)

    orders = models.ArrayReferenceField(to=Order)
    support_tickets = models.ArrayReferenceField(to=SupportTicket)

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        shopping_cart = Cart.objects.create()
        self.shopping_cart.add(shopping_cart)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
