from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=255) # Room name

class Sensor(models.Model):
    SENSOR_TYPES = (
        ('127', 'Accelerometer'),
        ('115', 'Movement'),
        ('136', 'Water Leak'),
        ('112', 'Temperature'),
        ('114', 'Humidity'),
        ('116', 'Atmospheric Pressure'),
        ('118', 'Brightness'),
        ('119', 'Noise Level'),
        ('124', 'Shock Detection'),
        ('125', 'Button Pressed'),
        ('128', 'Current Measurement'),
        ('131', 'CO2 Measurement'),
        ('184', 'Smoke Detection (Gas)'),
        # Add more if needed
    )

    sensor_id = models.CharField(max_length=10, null=True)
    sensor_type = models.CharField(max_length=200, null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)


class SensorData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)  # Indicates if sensor is active or not
    sink_id = models.CharField(max_length=50, null=True, blank=True) 
    source_address = models.UUIDField()
    tx_time_ms_epoch = models.BigIntegerField()
    data = models.JSONField()  # JSON 
    event_id = models.IntegerField(null=True, blank=True)
