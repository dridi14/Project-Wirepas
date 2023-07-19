from .serializers import UserSerializer
from .serializers import UserSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Room, Sensor, SensorData
from .serializers import RoomSerializer, SensorSerializer, SensorDataSerializer, Sensor_dataSerializer


class CreateUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RoomListCreate(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class SensorListCreate(generics.ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

class SensorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

class SensorDataListCreate(generics.ListCreateAPIView):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

class SensorDataRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

class SensorDataView(APIView):
    """
    get list all sensor data in a sensor.
    """
    def get(self, request, sensor_id):
        sensor_data = SensorData.objects.filter(sensor__sensor_id=sensor_id).order_by('-id')[:50]
        serializer = Sensor_dataSerializer(sensor_data, many=True)
        return Response(serializer.data)

class RoomSensorsView(APIView):
    """
    get list all sensors in a room.
    """
    def get(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)
        sensors = room.sensor_set.all()
        serializer = SensorSerializer(sensors, many=True)
        return Response(serializer.data)

class RoomSensorDataView(APIView):
    """
    get list all data of a sensor in a room.
    """
    def get(self, request, room_id, sensor_id):
        room = get_object_or_404(Room, id=room_id)
        sensor = get_object_or_404(Sensor, sensor_id=sensor_id, room=room)
        sensor_data = sensor.sensordata_set.all().order_by('-id')[:50]
        serializer = SensorDataSerializer(sensor_data, many=True)
        return Response(serializer.data)
