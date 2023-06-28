from django.db import migrations
import json
import random

# Maps sensor types to functions that generate random data for that sensor type
SENSOR_DATA_GENERATORS = {
    'Temperature': lambda: {"value": round(random.uniform(20.0, 30.0), 2)},
    'Humidity': lambda: {"value": round(random.uniform(30.0, 50.0), 2)},
    'Occupancy/Presence': lambda: {"value": random.choice([True, False])},
    'Smoke/Carbon Dioxide/Gas Toxicity Detection': lambda: {"value": random.choice([True, False])},
    'Shock Detection': lambda: {"value": random.choice([True, False])},
    'Pressure': lambda: {"value": round(random.uniform(1.0, 2.0), 2)},
    # Continue for all sensor types
}

def create_sensor_data(apps, schema_editor):
    Room = apps.get_model('main', 'Room')
    Sensor = apps.get_model('main', 'Sensor')
    SensorData = apps.get_model('main', 'SensorData')

    for room in Room.objects.all():
        for sensor in room.sensor_set.all():
            generator = SENSOR_DATA_GENERATORS.get(sensor.sensor_type)
            if generator is not None:
                data = generator()
                SensorData.objects.create(
                    sensor=sensor,
                    sink_id='123',  # replace with actual sink_id logic
                    source_address=random.randint(1000, 2000),
                    tx_time_ms_epoch=random.randint(1000000000, 2000000000),
                    data=json.dumps(data),
                    event_id=random.randint(1, 100)
                )


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20230627_1410'),
    ]

    operations = [
        migrations.RunPython(create_sensor_data),
    ]