from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.core import validators
from djongo import models

from core.fields import Decimal128Field
from games.models import Game, Platform
from .managers import UserManager


# Create your models here.
class Item(models.Model):
    game = models.ArrayReferenceField(to=Game)
    platform = models.ArrayReferenceField(to=Platform)
    quantity = models.PositiveIntegerField(validators=[validators.MinValueValidator(1)])

    objects = models.DjongoManager()


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    items = models.ArrayReferenceField(to=Item)

    objects = models.DjongoManager()


class Address(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=9,
        validators=[
            validators.RegexValidator("^[0-9]{9}$", "Phone number must be 9 digits.")
        ],
    )
    street = models.CharField(max_length=255)
    street_number = models.CharField(max_length=255)
    flat_number = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255)
    post_code = models.CharField(
        max_length=6,
        validators=[
            validators.RegexValidator(
                "^[0-9]{2}-[0-9]{3}$", "Invalid post code. Correct format is XX-XXX."
            )
        ],
    )
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    objects = models.DjongoManager()

    def __str__(self):
        return f"Address for {self.first_name} {self.last_name}"


class Order(models.Model):
    ORDER_STATUS_PENDING = "PENDING"
    ORDER_STATUS_SHIPMENT = "SHIPMENT"
    ORDER_STATUS_COMPLETED = "COMPLETED"

    ORDER_STATUS_CHOICES = [
        (ORDER_STATUS_PENDING, "Pending"),
        (ORDER_STATUS_SHIPMENT, "Shipment"),
        (ORDER_STATUS_COMPLETED, "Completed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    items = models.ArrayReferenceField(to=Item)
    status = models.CharField(
        max_length=10, choices=ORDER_STATUS_CHOICES, default=ORDER_STATUS_PENDING
    )
    address = models.ArrayReferenceField(to=Address)
    total_price = Decimal128Field(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.DjongoManager()


class SupportTicketMessage(models.Model):
    author = models.CharField(max_length=255)
    message = models.TextField(
        validators=[
            validators.MinLengthValidator(10),
            validators.MaxLengthValidator(1000),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.DjongoManager()


class SupportTicket(models.Model):
    TICKET_STATUS_OPEN = "OPEN"
    TICKET_STATUS_CLOSE = "CLOSED"

    TICKET_STATUS_CHOICES = [
        (TICKET_STATUS_OPEN, "Open"),
        (TICKET_STATUS_CLOSE, "Closed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    status = models.CharField(
        max_length=10, choices=TICKET_STATUS_CHOICES, default=TICKET_STATUS_OPEN
    )
    order = models.ArrayReferenceField(to=Order, on_delete=models.CASCADE)
    messages = models.ArrayReferenceField(to=SupportTicketMessage)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.DjongoManager()


class User(AbstractUser):
    email = models.EmailField("email address", unique=True)
    first_name = None
    last_name = None

    favourites = models.ArrayReferenceField(to=Game)

    address = models.ArrayReferenceField(to=Address)
    cart = models.ArrayReferenceField(to=Cart)

    orders = models.ArrayReferenceField(to=Order)
    support_tickets = models.ArrayReferenceField(to=SupportTicket)

    objects = UserManager()

    def __str__(self):
        return self.username
