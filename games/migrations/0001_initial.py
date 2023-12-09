# Generated by Django 4.1.13 on 2023-12-09 12:16

import django.core.validators
from django.db import migrations, models
import djongo.models.fields
import games.models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Developer",
            fields=[
                (
                    "name",
                    models.CharField(
                        max_length=255, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("slug", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=255, unique=True)),
                ("name_original", models.CharField(max_length=255, unique=True)),
                ("slug", models.SlugField(max_length=255, unique=True)),
                ("likes", models.IntegerField(default=0)),
                ("released", models.DateField(blank=True, null=True)),
                (
                    "metacritic",
                    models.IntegerField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(100),
                        ],
                    ),
                ),
                ("background_image", models.URLField(blank=True, null=True)),
                ("website", models.URLField(blank=True, null=True)),
                ("description_raw", models.TextField(blank=True, null=True)),
                (
                    "genres",
                    djongo.models.fields.ArrayField(model_container=games.models.Genre),
                ),
                (
                    "platforms",
                    djongo.models.fields.ArrayField(
                        model_container=games.models.Platform
                    ),
                ),
                (
                    "developers",
                    djongo.models.fields.ArrayField(
                        model_container=games.models.Developer
                    ),
                ),
                (
                    "screenshots",
                    djongo.models.fields.ArrayField(
                        model_container=games.models.Screenshot
                    ),
                ),
                (
                    "reviews",
                    djongo.models.fields.ArrayField(
                        model_container=games.models.Review
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Genre",
            fields=[
                (
                    "name",
                    models.CharField(
                        max_length=255, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("slug", models.CharField(max_length=255, unique=True)),
                ("background_image", models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Platform",
            fields=[
                (
                    "name",
                    models.CharField(
                        max_length=255, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("slug", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Review",
            fields=[
                (
                    "author",
                    models.CharField(
                        max_length=255, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("content", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Screenshot",
            fields=[
                ("image", models.URLField(primary_key=True, serialize=False)),
                ("width", models.IntegerField()),
                ("height", models.IntegerField()),
            ],
        ),
    ]
