from .common import *
from environ import Env

env = Env(MONGO_PORT=(int, 27017), DJANGO_LOG_LEVEL=(str, "WARNING"))
Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY")

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "NAME": "game_shop_db",
        "ENFORCE_SCHEMA": True,
        "CLIENT": {
            "host": env("MONGO_HOST"),
            "port": env("MONGO_PORT"),
            # 'username': 'db-username',
            # 'password': 'password',
            # 'authSource': 'db-name',
            # 'authMechanism': 'SCRAM-SHA-1'
        },
    }
}

MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SECURE = True

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": "general.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": env("DJANGO_LOG_LEVEL"),
        },
    },
    "formatters": {
        "verbose": {
            "format": "{asctime} ({levelname}) - {name} - {message}",
            "style": "{",
        }
    },
}
