from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)

class Sensor(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    users = models.ManyToManyField(User, related_name='sensors')

class Room(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    sensors = models.ManyToManyField(Sensor, related_name='rooms')

class Payload(models.Model):
    timestamp = models.DateTimeField()
    value = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payloads')
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='payloads')

class Action(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actions')
    payload = models.ForeignKey(Payload, on_delete=models.CASCADE, related_name='actions')
