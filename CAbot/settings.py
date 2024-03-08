from pathlib import Path
import os
import pymysql

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-k_p!ms0tqps^wr^2=b=0-dvur=u!sikfsg06i&5$57(vkxbh1&'

# SECURITY WARNING: don't run with debug turned on in production!

# Application definition

INSTALLED_APPS = [
    'daphne',
    'chat',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'home',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'CAbot.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'CAbot.wsgi.application'


ASGI_APPLICATION = "CAbot.asgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}




# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'ko-KR'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/django'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

pymysql.install_as_MySQLdb()

# 개발환경

# DEBUG = True

# ALLOWED_HOSTS = [
#     '*'
# ]

# STATICFILES_DIRS = (os.path.join('static'), )

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql', 
#         'NAME' : 'youris_dev',
#         'USER' : 'admin',
#         'PASSWORD' : 'ldg8410229!', 
#         'HOST': 'bbgodd.cnbiolxtzcku.ap-northeast-2.rds.amazonaws.com',
#         'PORT': '3306', 
#         'OPTIONS':{
#             'init_command' : "SET sql_mode='STRICT_TRANS_TABLES'"
#         }
#     }
# }
# phoneNumber = '01054088229'


#배포환경

DEBUG = False

ALLOWED_HOSTS = [
    '*',
    'gabot.co.kr',
    'www.gabot.co.kr',
    'cabo.kr',
    'www.cabo.kr'
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME' : 'youris_dev',
        'USER' : 'admin',
        'PASSWORD' : 'ldg8410229!',
        'HOST': 'bbgodd.cnbiolxtzcku.ap-northeast-2.rds.amazonaws.com',
        'PORT': '3306',
        'OPTIONS':{
            'init_command' : "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}
phoneNumber = '01050487229'

