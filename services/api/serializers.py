from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from . import models


class UserSerializer(ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    class Meta:
        depth = 1
        model = models.User
        fields = '__all__'


class CompanySerializer(ModelSerializer):
    location = serializers.IntegerField(default=1)

    class Meta:
        model = models.Company
        fields = '__all__'
