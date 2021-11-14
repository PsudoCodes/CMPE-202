from django.db import models


class Flight(models.Model):
    flight_number = models.CharField(max_length=32)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    durationInMinutes = models.IntegerField()

