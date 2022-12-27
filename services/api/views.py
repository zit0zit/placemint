from django.db import transaction
from rest_framework import viewsets, exceptions, mixins, serializers as ser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema

from . import models
from . import serializers

# Create your views here.


class AuthSerializer(ser.Serializer):
    email = ser.EmailField()
    password = ser.CharField()


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
    def auth(self, req):
        auth = AuthSerializer(data=req.data)
        auth.is_valid(raise_exception=True)

        email = auth.data['email']
        password = auth.data['password']

        res = models.User.login(email, password)
        if res is not None:
            user, token = res
        else:
            raise exceptions.AuthenticationFailed('invalid token')

        return Response({
            'token': token,
            'user': serializers.UserSerializer(user).data,
        })

    @action(['GET'], False)
    def get(self, req):
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
    def get(self, req):
        c = serializers.CompanySerializer(
            req.user.work_at).data if req.user.work_at is not None else None
        return Response(c)

    @swagger_auto_schema(methods=['POST'], request_body=NewCompanySerializer)
    @action(['POST'], False)
    def new(self, req):
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

                res = models.User.login(u.email, u.password)
                if res is not None:
                    _, token = res
                else:
                    raise exceptions.AuthenticationFailed('invalid token')
        except Exception as e:
            e = exceptions.ValidationError(e)
            e.status_code = 422
            raise e
        return Response({
            'token': token,
            'user': serializers.UserSerializer(u).data,
        })


class JobSkillViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = models.JobSkill.objects.all()
    serializer_class = serializers.JobSkillSerializer


class NewJobSerializer(ser.Serializer):
    user_name = ser.CharField()
    email = ser.EmailField()
    password = ser.CharField()
    comapy_name = ser.CharField(max_length=50)
    website = ser.CharField(max_length=50)
    phone = ser.CharField(max_length=12)
    location = ser.IntegerField(default=1)


class JobViewSet(
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet,
):
    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer

    def get_permissions(self):
        print('act:', self.action)
        if self.action == 'new':
            return [IsAdminUser()]
        elif self.action in [None, 'update', 'partial_update', 'destroy']:
            return [IsAdminUser(), models.Job.IsOwnJob()]
        else:
            return super(JobViewSet, self).get_permissions()

    @action(['POST'], False)
    def new(self, req):
        try:
            with transaction.atomic():
                job = models.Job.objects.create(
                    title=req.data['title'],
                    salary=req.data['salary'],
                    location=req.data['location'],
                    detail=req.data['detail'],
                    of_company=req.user.work_at,
                )

                skills = req.data.get('skills', [])
                for skill in skills:
                    job.skills.add(skill)

                job.save()

                job_ser = serializers.JobSerializer(job).data
                # print(job_ser)
        except Exception as e:
            e = exceptions.ValidationError(e)
            e.status_code = 422
            raise e
        return Response(job_ser)

    @action(['GET'], False)
    def list_all(self, req):
        try:
            title = req.query_params.get('title')
            comp = req.query_params.get('comp')
            comp_id = req.query_params.get('comp_id')
            skill = req.query_params.get('skill')
            skill_name = req.query_params.get('skill_name')
            location = req.query_params.get('location')
            salary = req.query_params.get('salary')
            product = req.query_params.get('product')
            level = req.query_params.get('level', '')
            level = list(map(int, level.split(',') if level else []))

            filters = {}
            if title:
                filters['title__icontains'] = title
            if comp:
                filters['of_company__name__icontains'] = comp
            if comp_id:
                filters['of_company__id'] = comp_id
            if skill:
                filters['skills'] = skill
            if skill_name:
                filters['skills__name__icontains'] = skill_name
            if location:
                filters['of_company__location'] = location
            if product:
                filters['of_company__is_product'] = product == 'true'
            if level:
                filters['level__in'] = level

            if salary == '0':
                filters['salary__gte'] = 500
            elif salary == '1':
                filters['salary__gte'] = 1000
            elif salary == '2':
                filters['salary__gte'] = 2000
            elif salary == '3':
                filters['salary__gte'] = 2500

            jobs = models.Job.objects.filter(**filters)
            jobs_ser = serializers.JobSerializer(jobs, many=True).data
        except Exception as e:
            e = exceptions.ValidationError(e)
            e.status_code = 422
            raise e
        return Response(jobs_ser)
