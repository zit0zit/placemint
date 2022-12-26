"""
WSGI config for services project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os

from pathlib import Path

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BASE_DIR.parent

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'services.settings')

frontend_dist = ROOT_DIR / 'frontend/dist'

application = get_wsgi_application()
application = WhiteNoise(application, root=frontend_dist)
