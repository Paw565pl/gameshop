from django.core.validators import MinValueValidator, MaxValueValidator
from djongo import models


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
    width = models.IntegerField()
    height = models.IntegerField()

    objects = models.DjongoManager()


class Review(models.Model):
    author = models.CharField(max_length=255)
    is_positive = models.BooleanField()
    content = models.TextField()

    objects = models.DjongoManager()

    def __str__(self):
        return f"review by {self.author}"


class Game(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_original = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    released = models.DateField(null=True, blank=True)
    metacritic = models.IntegerField(
        null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    background_image = models.URLField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    description_raw = models.TextField(null=True, blank=True)

    genres = models.ArrayReferenceField(to=Genre, on_delete=models.PROTECT)
    platforms = models.ArrayReferenceField(to=Platform, on_delete=models.PROTECT)
    developers = models.ArrayReferenceField(to=Developer, on_delete=models.PROTECT)

    screenshots = models.ArrayReferenceField(to=Screenshot)

    reviews = models.ArrayReferenceField(to=Review)
    reviews_count = models.IntegerField(default=0)

    objects = models.DjongoManager()

    class Meta:
        indexes = [
            models.Index(name="name_index", fields=["name"]),
            models.Index(name="released_index", fields=["released"]),
            models.Index(name="metacritic_index", fields=["metacritic"]),
        ]

    def __str__(self):
        return self.name
