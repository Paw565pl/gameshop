from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, username=None, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError("User must have username address")
        if not email:
            raise ValueError("User must have email address")

        user_model = self.model
        email = self.normalize_email(email)

        is_username_unique = user_model.objects.filter(username=username).count() == 0
        if not is_username_unique:
            raise ValueError("Username must be unique")

        is_email_unique = user_model.objects.filter(email=email).count() == 0
        if not is_email_unique:
            raise ValueError("Email must be unique")

        user = user_model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)
