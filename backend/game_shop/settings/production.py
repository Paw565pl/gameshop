from .common import *  # noqa: F403
from environ import Env

env = Env(
    RENDER_EXTERNAL_HOSTNAME=(str, None),
    DJANGO_LOG_LEVEL=(str, "WARNING"),
)
Env.read_env(BASE_DIR / ".env")  # noqa: F405

SECRET_KEY = env("SECRET_KEY")

DEBUG = False

CORS_ALLOWED_ORIGINS = [
    "https://gameshop-frontend.onrender.com",
]

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

RENDER_EXTERNAL_HOSTNAME = env("RENDER_EXTERNAL_HOSTNAME")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "djongo",
        "NAME": "game_shop_db",
        "ENFORCE_SCHEMA": True,
        "CLIENT": {
            "host": env("MONGO_HOST"),
        },
    }
}

MIDDLEWARE.insert(2, "whitenoise.middleware.WhiteNoiseMiddleware")  # noqa: F405

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

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
