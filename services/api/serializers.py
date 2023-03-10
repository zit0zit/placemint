from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from . import models


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True,
                                     required=True,
                                     style={
                                         'input_type': 'password',
                                         'placeholder': 'Password'
                                     })

    class Meta:
        depth = 1
        model = models.User
        fields = '__all__'


class CompanySerializer(ModelSerializer):
    location = serializers.IntegerField(default=1)

    class Meta:
        model = models.Company
        fields = '__all__'


class JobSkillSerializer(ModelSerializer):

    class Meta:
        model = models.JobSkill
        fields = '__all__'


class NewJobSerializer(ModelSerializer):
    skills = serializers.ListField(child=serializers.UUIDField(), write_only=True)

    def to_representation(self, instance):
        serializer = JobSerializer(instance)
        return serializer.data

    class Meta:
        depth = 1
        model = models.Job
        fields = '__all__'


class JobSerializer(ModelSerializer):

    class Meta:
        depth = 1
        model = models.Job
        fields = '__all__'


class NewCompanyReviewSerializer(ModelSerializer):
    for_company = serializers.UUIDField()

    class Meta:
        depth = 1
        model = models.CompanyReview
        fields = '__all__'


class CompanyReviewSerializer(ModelSerializer):
    rate = serializers.FloatField()

    class Meta:
        depth = 1
        model = models.CompanyReview
        fields = '__all__'
