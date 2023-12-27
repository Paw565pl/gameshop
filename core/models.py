from django.contrib.auth.models import AbstractUser
from djongo import models

from core.managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField("email address", unique=True)
    first_name = None
    last_name = None

    objects = CustomUserManager()

    def __str__(self):
        return self.username
