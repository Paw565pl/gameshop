from django.core.validators import MinValueValidator, MaxValueValidator
from djongo import models


# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True, primary_key=True)
    slug = models.CharField(max_length=255, unique=True)
    background_image = models.URLField(null=True, blank=True)


class Platform(models.Model):
    name = models.CharField(max_length=255, unique=True, primary_key=True)
    slug = models.CharField(max_length=255, unique=True)


class Developer(models.Model):
    name = models.CharField(max_length=255, unique=True, primary_key=True)
    slug = models.CharField(max_length=255, unique=True)


class Screenshot(models.Model):
    image = models.URLField(primary_key=True)
    width = models.IntegerField()
    height = models.IntegerField()


class Review(models.Model):
    author = models.CharField(max_length=255, unique=True, primary_key=True)
    content = models.TextField()


class Game(models.Model):
    name = models.CharField(max_length=255, db_index=True, unique=True)
    name_original = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, db_index=True, unique=True)
    likes = models.IntegerField(default=0)
    released = models.DateField(null=True, blank=True)
    metacritic = models.IntegerField(
        null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    background_image = models.URLField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    description_raw = models.TextField(null=True, blank=True)
    genres = models.ArrayField(model_container=Genre, default=[])
    platforms = models.ArrayField(model_container=Platform, default=[])
    developers = models.ArrayField(model_container=Developer, default=[])
    screenshots = models.ArrayField(model_container=Screenshot, default=[])
    reviews = models.ArrayField(model_container=Review, default=[])
