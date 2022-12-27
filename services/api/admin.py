from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.User)
admin.site.register(models.Job)
admin.site.register(models.JobSkill)
admin.site.register(models.Company)
admin.site.register(models.CompanyReview)
