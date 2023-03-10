from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.urls import re_path
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="Placemint API",
        default_version='v1',
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()

router.register('users', views.UserViewSet, basename='users')
router.register('companies', views.CompanyViewSet, basename='companies')
router.register('skills', views.JobSkillViewSet, basename='skills')
router.register('jobs', views.JobViewSet, basename='jobs')
router.register('reviews', views.CompanyReviewViewSet, basename='reviews')

urlpatterns = router.urls

urlpatterns += [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path(r'^swagger/$',
            schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
]
