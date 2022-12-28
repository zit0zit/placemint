import jwt
import uuid
import datetime
from django.db import models
from django.core import validators
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
    title = models.CharField(max_length=100)
    salary = models.IntegerField(validators=[validators.MinValueValidator(0)])
    level = models.IntegerField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(3),
    ])
    location = models.CharField(max_length=200)
    detail = models.TextField()
    of_company = models.ForeignKey('Company',
                                   on_delete=models.CASCADE,
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

    logo = models.CharField(max_length=500, null=True, default=None)
    name = models.CharField(unique=True, max_length=50)
    website = models.CharField(unique=True, max_length=50)
    phone = models.CharField(max_length=12)
    location = models.IntegerField(default=0,
                                   validators=[
                                       validators.MinValueValidator(0),
                                       validators.MaxValueValidator(3),
                                   ])
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


class CompanyReview(IdModel):
    rate_salary = models.FloatField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(5),
    ])
    rate_training = models.FloatField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(5),
    ])
    rate_cares = models.FloatField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(5),
    ])
    rate_fun = models.FloatField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(5),
    ])
    rate_workspace = models.FloatField(validators=[
        validators.MinValueValidator(0),
        validators.MaxValueValidator(5),
    ])

    title = models.CharField(max_length=50)
    content = models.TextField()
    for_company = models.ForeignKey(Company, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def rate(self):
        return sum([
            self.rate_salary, self.rate_training, self.rate_cares,
            self.rate_fun, self.rate_workspace
        ]) / 5

    def __str__(self):
        return f'''
Review:
  Id: {self.id}
  Rate: {self.rate}
  Title: {self.title}
  Company: {self.for_company}
'''

    class IsOwnReview(BasePermission):

        def has_permission(self, req, view):
            return req.user.id == view.get_object().user.id
