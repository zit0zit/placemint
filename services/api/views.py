from django.db import transaction
from rest_framework import viewsets, exceptions, mixins, serializers as ser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema

from . import models
from . import serializers

# Create your views here.


class AuthSerializer(serializers.UserSerializer):
    class Meta:
        model = models.User
        fields = ['email', 'password']


class UserViewSet(
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet,
):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    serializer_action_classes = {
        'auth': AuthSerializer,
    }

    def get_permissions(self):
        print(self.action)
        if self.action == 'get':
            return [IsAuthenticated()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), models.User.IsSameUser()]
        else:
            return super(UserViewSet, self).get_permissions()

    @swagger_auto_schema(methods=['POST'], request_body=AuthSerializer)
    @action(['POST'], False)
    def auth(self, req, *args, **kwargs):
        auth = serializers.UserSerializer(data=req.data)

        try:
            user, token = models.User.login(
                auth.initial_data['email'], auth.initial_data['password'])
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('invalid token')

        return Response({
            'token': token,
            'user': serializers.UserSerializer(user).data,
        })

    @action(['GET'], False)
    def get(self, req, *args, **kwargs):
        return Response(serializers.UserSerializer(req.user).data)


class NewCompanySerializer(ser.Serializer):
    user_name = ser.CharField()
    email = ser.EmailField()
    password = ser.CharField()
    comapy_name = ser.CharField(max_length=50)
    website = ser.CharField(max_length=50)
    phone = ser.CharField(max_length=12)
    location = ser.IntegerField(default=1)


class CompanyViewSet(
        mixins.ListModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet,
):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer
    serializer_action_classes = {
        'new': NewCompanySerializer,
    }

    def get_permissions(self):
        print('act:', self.action)
        if self.action == 'get':
            return [IsAuthenticated()]
        elif self.action in [None, 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), models.Company.IsMemer()]
        else:
            return super(CompanyViewSet, self).get_permissions()

    @action(['GET'], False)
    def get(self, req, *args, **kwargs):
        c = serializers.CompanySerializer(
            req.user.work_at).data if req.user.work_at is not None else None
        return Response(c)

    @swagger_auto_schema(methods=['POST'], request_body=NewCompanySerializer)
    @action(['POST'], False)
    def new(self, req, *args, **kwargs):
        try:
            with transaction.atomic():
                c = models.Company.objects.create(
                    name=req.data['comapy_name'],
                    website=req.data['website'],
                    phone=req.data['phone'],
                    location=req.data['location'],
                )

                u = models.User.objects.create(
                    name=req.data['user_name'],
                    email=req.data['email'],
                    password=req.data['password'],
                    is_employer=True,
                    work_at=c,
                )

                user, token = models.User.login(u.email, u.password)
        except Exception as e:
            e = exceptions.ValidationError(e)
            e.status_code = 422
            raise e
        return Response({
            'token': token,
            'user': serializers.UserSerializer(u).data,
        })
