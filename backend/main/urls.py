from django.urls import path, include
from django.contrib import admin
from . import views
from .views import CreateUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('accounts/register/', views.register, name='register'),
    path('accounts/register/', CreateUserView.as_view(), name='create_user'),
    path('accounts/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]