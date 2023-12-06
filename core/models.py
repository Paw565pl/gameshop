from django.contrib.auth.models import AbstractUser
from djongo import models


# Create your models here.
class BaseModel(models.Model):
    _id = models.ObjectIdField(primary_key=True)

    class Meta:
        abstract = True


class User(BaseModel, AbstractUser):
    email = models.EmailField("email address", unique=True)
    first_name = None
    last_name = None
