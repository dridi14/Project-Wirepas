from .serializers import UserSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .models import Room, Sensor, SensorData, AutomationRule
from .serializers import RoomSerializer, SensorSerializer, SensorDataSerializer, Sensor_dataSerializer, AutomationRuleSerializer
from .constants import COMMANDS
import os
import json
from paho.mqtt import client as mqtt_client
import random


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

class CommandRoomView(APIView):
    """
    post a command to a room.
    """
    def post(self, request, room_id, format=None):
        room = get_object_or_404(Room, pk=room_id)
        gateway_id = room.name 
        group = 'groupe1'
        cmd_type = request.data.get('command')

        if not cmd_type:
            return Response({"error": f"Invalid command.{cmd_type}"}, status=400)

        command_dict = {
            "cmd_id": random.randint(1, 10000), 
            "destination_address": room.name,
            "ack_flags": 0,
            "cmd_type": cmd_type
        }

        mqtt_username = os.environ['MQTT_USERNAME']
        mqtt_password = os.environ['MQTT_PASSWORD']
        broker = 'mqtt.arcplex.fr'  
        port = 2295 

        def connect_mqtt() -> mqtt_client:
            def on_connect(client, userdata, flags, rc):
                if rc == 0:
                    print("Connected to MQTT Broker!")
                else:
                    print("Failed to connect, return code %d\n", rc)

            client = mqtt_client.Client()
            client.username_pw_set(mqtt_username, mqtt_password)
            client.on_connect = on_connect
            client.connect(broker, port)
            return client

        client = connect_mqtt()
        client.loop_start()

        mqtt_topic = f"{group}/request/{gateway_id}"
        result = client.publish(mqtt_topic, json.dumps(command_dict))

        if result[0] == 0:
            print(f"Command sent to topic {mqtt_topic}.")
            return Response({"message": f"Command sent to topic {mqtt_topic}."}, status=200)
        else:
            print(f"Failed to send command to topic {mqtt_topic}.")
            return Response({"message": f"Failed to send command to topic {mqtt_topic}."}, status=400)

class AutomationRuleAPI(APIView):
    def get(self, request, format=None):
        rules = AutomationRule.objects.all()
        serializer = AutomationRuleSerializer(rules, many=True)
        return Response(serializer.data)

    def post(self, request):
        room_id = request.data.get('room')
        sensor_id = request.data.get('sensor')
        command = request.data.get('command')
        condition = request.data.get('condition')

        try:
            sensor = Sensor.objects.get(sensor_id=sensor_id, room__id=room_id)
        except Sensor.DoesNotExist:
            raise NotFound("Sensor with the given id does not exist.")

        rule = AutomationRule.objects.create(
            sensor=sensor,
            command=command,
            condition=condition,
            state=False
        )

        return Response({"message": f"AutomationRule created with id: {rule.id}"}, status=201)
        
    def delete(self, request, rule_id):
        try:
            rule = AutomationRule.objects.get(id=rule_id)
        except AutomationRule.DoesNotExist:
            raise NotFound("AutomationRule with the given id does not exist.")

        rule.delete()

        return Response({"message": f"AutomationRule with id {rule_id} deleted."}, status=status.HTTP_204_NO_CONTENT)
