from django.contrib.auth.models import AbstractUser
from djongo import models


# Create your models here.


class User(AbstractUser):
    email = models.EmailField("email address", unique=True)
    first_name = None
    last_name = None
