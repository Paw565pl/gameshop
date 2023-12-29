# Generated by Django 4.1.13 on 2023-12-29 11:47

import core.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Developer",
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("slug", models.SlugField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Genre",
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("slug", models.SlugField(max_length=255, unique=True)),
                ("background_image", models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Platform",
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("slug", models.SlugField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Review",
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
                ("author", models.CharField(max_length=255)),
                ("is_positive", models.BooleanField()),
                (
                    "content",
                    models.TextField(
                        validators=[
                            django.core.validators.MinLengthValidator(10),
                            django.core.validators.MaxLengthValidator(1000),
                        ]
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Screenshot",
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
                ("image", models.URLField()),
                ("width", models.IntegerField(blank=True, null=True)),
                ("height", models.IntegerField(blank=True, null=True)),
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
                ("name", models.CharField(max_length=255, unique=True)),
                ("name_original", models.CharField(max_length=255, unique=True)),
                ("slug", models.SlugField(max_length=255, unique=True)),
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
                    "price",
                    core.fields.Decimal128Field(
                        decimal_places=2,
                        max_digits=6,
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                (
                    "developers",
                    djongo.models.fields.ArrayReferenceField(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="games.developer",
                    ),
                ),
                (
                    "genres",
                    djongo.models.fields.ArrayReferenceField(
                        on_delete=django.db.models.deletion.PROTECT, to="games.genre"
                    ),
                ),
                (
                    "platforms",
                    djongo.models.fields.ArrayReferenceField(
                        on_delete=django.db.models.deletion.PROTECT, to="games.platform"
                    ),
                ),
                (
                    "reviews",
                    djongo.models.fields.ArrayReferenceField(
                        on_delete=djongo.models.fields.ArrayReferenceField._on_delete,
                        to="games.review",
                    ),
                ),
                (
                    "screenshots",
                    djongo.models.fields.ArrayReferenceField(
                        on_delete=djongo.models.fields.ArrayReferenceField._on_delete,
                        to="games.screenshot",
                    ),
                ),
            ],
        ),
        migrations.AddIndex(
            model_name="game",
            index=models.Index(fields=["name"], name="name_index"),
        ),
        migrations.AddIndex(
            model_name="game",
            index=models.Index(fields=["released"], name="released_index"),
        ),
        migrations.AddIndex(
            model_name="game",
            index=models.Index(fields=["metacritic"], name="metacritic_index"),
        ),
    ]
