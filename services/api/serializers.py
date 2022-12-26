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
        model = models.User
        fields = '__all__'
