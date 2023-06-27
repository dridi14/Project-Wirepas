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

class student(models.Model):
    name = models.CharField(max_length=50)
    roll = models.IntegerField()
    des = models.TextField()

    def __str__(self):
        return self.name
        