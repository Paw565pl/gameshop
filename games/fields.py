from djongo import models
from bson import Decimal128


class Decimal128Field(models.DecimalField):
    def get_prep_value(self, value):
        return Decimal128(super().get_prep_value(value))
