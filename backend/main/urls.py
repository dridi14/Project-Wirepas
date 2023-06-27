from django.urls import path, include
from django.contrib import admin
from . import views
from .views import (RoomListCreate, RoomRetrieveUpdateDestroy, SensorListCreate, 
                    SensorRetrieveUpdateDestroy, SensorDataListCreate, SensorDataRetrieveUpdateDestroy, CreateUserView)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('accounts/register/', CreateUserView.as_view(), name='create_user'),
    path('accounts/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('rooms/', RoomListCreate.as_view()),
    path('rooms/<int:pk>/', RoomRetrieveUpdateDestroy.as_view()),
    path('sensors/', SensorListCreate.as_view()),
    path('sensors/<int:pk>/', SensorRetrieveUpdateDestroy.as_view()),
    path('sensordata/', SensorDataListCreate.as_view()),
    path('sensordata/<int:pk>/', SensorDataRetrieveUpdateDestroy.as_view()),
]