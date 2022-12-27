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
    id = models.UUIDField(auto_created=True,
                          default=uuid.uuid4,
                          primary_key=True,
                          editable=False)

    class Meta:
        abstract = True


class JobSkill(IdModel):
    name = models.CharField(null=False,
                            blank=False,
                            unique=True,
                            max_length=50,
                            default=None)

    def __str__(self):
        return f'''
JobSkill:
  Id: {self.id}
  Name: {self.name}
'''


class Job(IdModel):
    title = models.CharField(null=False,
                             blank=False,
                             max_length=100,
                             default=None)
    salary = models.IntegerField(default=0)
    level = models.IntegerField(default=0)
    location = models.CharField(max_length=200, default=None)
    detail = models.TextField(default=None)
    of_company = models.ForeignKey('Company',
                                   on_delete=models.CASCADE,
                                   default=None,
                                   editable=False)
    skills = models.ManyToManyField(JobSkill, default=None)

    class Meta:
        unique_together = ('title', 'of_company')

    def __str__(self):
        return f'''
Job:
  Id: {self.id}
  Title: {self.title}
  Salary: {self.salary}
  Location: {self.location}
  Company: {self.of_company}
  Skills: {self.skills}
'''

    class IsOwnJob(BasePermission):

        def has_permission(self, req, view):
            return req.user.work_at is not None \
                and view.get_object().of_company.id == req.user.work_at.id


class Company(IdModel):
    locations = ['HCM', 'HN', 'DN', 'Others']

    name = models.CharField(null=False,
                            blank=False,
                            unique=True,
                            max_length=50,
                            default=None)
    website = models.CharField(null=False,
                               blank=False,
                               unique=True,
                               max_length=50,
                               default=None)
    phone = models.CharField(null=False,
                             blank=False,
                             max_length=12,
                             default=None)
    location = models.IntegerField(default=1)
    is_product = models.BooleanField(default=True)
    about = models.TextField(null=True, blank=True, default=None)

    def __str__(self):
        return f'''
Company:
  Id: {self.id}
  Name: {self.name}
  IsProduct: {self.is_product}
  Website: {self.website}
  Location: {None if not (0 <= self.location <= len(Company.locations))
  else Company.locations[self.location]}
'''

    class IsMemer(BasePermission):

        def has_permission(self, req, view):
            return req.user.work_at is not None \
                and req.user.work_at.id == view.get_object().id


class User(IdModel):
    name = models.CharField(null=False,
                            blank=False,
                            max_length=50,
                            default=None)
    email = models.EmailField(null=False,
                              blank=False,
                              unique=True,
                              default=None)
    password = models.CharField(max_length=50)
    is_employer = models.BooleanField(default=False, editable=False)
    work_at = models.ForeignKey(Company,
                                on_delete=models.CASCADE,
                                blank=True,
                                null=True,
                                default=None,
                                editable=False)

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

        token = jwt.encode(
            {
                'sub': str(user.id),
                'iat': datetime.datetime.now(),
                'exp': datetime.datetime.now() + datetime.timedelta(days=30),
            },
            settings.SECRET_KEY,
            algorithm='HS256')

        return user, token

    class IsSameUser(BasePermission):

        def has_permission(self, req, view):
            return req.user.id == view.get_object().id
