from django.core.management.base import BaseCommand
from paho.mqtt import client as mqtt_client
import paho.mqtt.client as mqtt
from main.models import Sensor, SensorData, Room
import os
import json

broker = 'mqtt.arcplex.fr'
port = 2295
topic = "groupe1/packet/#" 
mqtt_username = os.environ['MQTT_USERNAME']
mqtt_password = os.environ['MQTT_PASSWORD']

def connect_mqtt():
    client = mqtt_client.Client()
    client.username_pw_set(mqtt_username, mqtt_password)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(broker, port)
    return client

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(topic)
    print(f"Subscribed to {topic}")


def on_message(client, userdata, msg):
    print("Received message!")
    data = msg.payload.decode()
    data_json = json.loads(data) 

    # Extract room from the MQTT topic
    room_name = msg.topic.split('/')[2] 
    room, _ = Room.objects.get_or_create(name=room_name)

    # Extract fields from your MQTT message
    sensor_id = data_json.get('sensor_id')
    sink_id = data_json.get('sink_id')
    source_address = data_json.get('source_address')
    tx_time_ms_epoch = data_json.get('tx_time_ms_epoch')
    sensor_data = data_json.get('data')
    event_id = data_json.get('event_id')

    sensor, _ = Sensor.objects.get_or_create(sensor_id=sensor_id, room=room)

    # Create a new SensorData object
    instance = SensorData(sensor=sensor, is_active=True, sink_id=sink_id, source_address=source_address,
                          tx_time_ms_epoch=tx_time_ms_epoch, data=sensor_data, event_id=event_id)
    instance.save()
    print(f"Data saved: {data}")

class Command(BaseCommand):
    help = 'Run the MQTT client'

    def handle(self, *args, **options):
        client = connect_mqtt()
        client.loop_forever()
