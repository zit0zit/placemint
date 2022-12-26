import jwt
from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions

from .models import User


class Auth(authentication.TokenAuthentication):
    def authenticate(self, req):
        auth_header = req.headers.get('Authorization', None)
        if auth_header is None:
            return None

        try:
            token = Auth.get_token(auth_header)
            claim = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=claim['sub'])
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('invalid token')

        return user, claim

    @staticmethod
    def get_token(head: str):
        st = str.split(head, ' ')
        return st[0] if len(st) == 1 else st[1]
