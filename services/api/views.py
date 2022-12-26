from rest_framework import viewsets, exceptions, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, action
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

    def get_permissions(self):
        print(self.action)
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), models.User.IsSameUser()]
        else:
            return super(UserViewSet, self).get_permissions()

    @swagger_auto_schema(methods=['POST'], request_body=AuthSerializer)
    @action(['POST'], False, 'auth', 'auth')
    def auth(self, req, *args, **kwargs):
        auth = serializers.UserSerializer(data=req.data)

        try:
            user, token = models.User.login(
                auth.initial_data['email'], auth.initial_data['password'])
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('invalid token')

        return Response({
            'token': token
        })
