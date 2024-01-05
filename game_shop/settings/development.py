from .common import *
from os import environ
from datetime import timedelta

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-k32ernz5o^k8xa$-p%wb$7=k-6&_36p-63-!gkmy==v%srrjq8"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "NAME": "game_shop_db",
        "ENFORCE_SCHEMA": True,
        "CLIENT": {
            "host": environ.get("MONGO_HOST") or "localhost",
            "port": 27017,
        },
    }
}

SIMPLE_JWT = {"ACCESS_TOKEN_LIFETIME": timedelta(days=365)}
