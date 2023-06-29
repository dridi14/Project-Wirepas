import random
from django.db import migrations

def update_sensor_data_with_is_active(apps, schema_editor):
    SensorData = apps.get_model('main', 'SensorData')
    for sensor_data in SensorData.objects.all():
        sensor_data.is_active = random.choice([True, False])
        sensor_data.save()

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_sensordata_is_active'),
    ]

    operations = [
        migrations.RunPython(update_sensor_data_with_is_active),
    ]
