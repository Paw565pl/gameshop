from django.core import validators
from djongo import models

from core.fields import Decimal128Field


# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    background_image = models.URLField(null=True, blank=True)

    objects = models.DjongoManager()

    def __str__(self):
        return self.name


class Platform(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)

    objects = models.DjongoManager()

    def __str__(self):
        return self.name


class Developer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)

    objects = models.DjongoManager()

    def __str__(self):
        return self.name


class Screenshot(models.Model):
    image = models.URLField()
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)

    objects = models.DjongoManager()


class Review(models.Model):
    author = models.CharField(max_length=255)
    is_positive = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(
        validators=[
            validators.MinLengthValidator(10),
            validators.MaxLengthValidator(1000),
        ]
    )

    objects = models.DjongoManager()

    def __str__(self):
        return f"review by {self.author}"


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_original = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    released = models.DateField(null=True, blank=True)
    metacritic = models.IntegerField(
        null=True,
        blank=True,
        validators=[validators.MinValueValidator(0), validators.MaxValueValidator(100)],
    )
    background_image = models.URLField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    description_raw = models.TextField(null=True, blank=True)
    price = Decimal128Field(
        max_digits=6, decimal_places=2, validators=[validators.MinValueValidator(1)]
    )

    genres = models.ArrayReferenceField(to=Genre, on_delete=models.PROTECT)
    platforms = models.ArrayReferenceField(to=Platform, on_delete=models.PROTECT)
    developers = models.ArrayReferenceField(to=Developer, on_delete=models.PROTECT)

    screenshots = models.ArrayReferenceField(to=Screenshot)
    reviews = models.ArrayReferenceField(to=Review)

    objects = models.DjongoManager()

    class Meta:
        indexes = [
            models.Index(name="name_index", fields=["name"]),
            models.Index(name="released_index", fields=["released"]),
            models.Index(name="metacritic_index", fields=["metacritic"]),
        ]

    def __str__(self):
        return self.name
