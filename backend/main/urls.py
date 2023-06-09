from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.home, name='home'),
    # path('accounts/register/', views.register, name='register'),
    path('accounts/register/', UserCreateView.as_view(), name='user-create'),
    path('accounts/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]