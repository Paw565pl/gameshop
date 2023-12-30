from .common import *

SECRET_KEY = "django-insecure-k32ernz5o^k8xa$-p%wb$7=k-6&_36p-63-!gkmy==v%srrjq8"

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     "default": {
#         "ENGINE": "djongo",
#         "NAME": "game_shop_db",
#         "ENFORCE_SCHEMA": True,
#         "CLIENT": {
#             "host": env("MONGO_HOST"),
#             "port": env("MONGO_PORT"),
#             # 'username': 'db-username',
#             # 'password': 'password',
#             # 'authSource': 'db-name',
#             # 'authMechanism': 'SCRAM-SHA-1'
#         },
#     }
# }

MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SECURE = True

# LOGGING
