import jwt
import uuid
import datetime
from django.db import models
from django.conf import settings
from rest_framework.permissions import BasePermission

# Create your models here.


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class IdModel(TimeStampedModel):
    id = models.UUIDField(auto_created=True, default=uuid.uuid4,
                          primary_key=True, editable=False)

    class Meta:
        abstract = True


class User(IdModel):
    name = models.CharField(null=False, blank=False,
                            max_length=50, default=None)
    email = models.EmailField(null=False, blank=False,
                              unique=True, default=None)
    password = models.CharField(max_length=50)
    is_employer = models.BooleanField(default=False, editable=False)

    def __str__(self):
        return f'''
User:
  Id: {self.id}
  Name: {self.name}
  Email: {self.email}
  IsEmployer: {self.is_employer}
'''

    @property
    def is_anonymous(self):
        return self.email is not None

    @property
    def is_authenticated(self):
        return True

    @property
    def is_staff(self):
        return self.is_employer

    @staticmethod
    def login(email: str, password: str):
        try:
            user = User.objects.get(email=email, password=password)
        except Exception:
            return None

        token = jwt.encode({
            'sub': str(user.id),
            'iat': datetime.datetime.now(),
            'exp': datetime.datetime.now() + datetime.timedelta(days=30),
        }, settings.SECRET_KEY, algorithm='HS256')

        return user, token

    class IsSameUser(BasePermission):
        def has_permission(self, req, view):
            return req.user.id == view.get_object().id
