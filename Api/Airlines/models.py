from __future__ import unicode_literals

from django.db import models
from django.db import models
from model_utils import Choices


class Customer(models.Model):
    name = models.CharField(max_length=138)
    contact = models.CharField(max_length=64, unique=True)
    address = models.CharField(max_length=190)
    email = models.EmailField(max_length=138, unique=True)


class Flight(models.Model):
    airline = models.CharField(max_length=138)
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()
    price = models.IntegerField()
    from_location = models.CharField(max_length=183)
    to_location = models.CharField(max_length=183)
    duration = models.IntegerField()
    departure = models.DateTimeField()
    arrival = models.DateTimeField()


class Booking(models.Model):
    STATUS = Choices(('booked', 'BOOKED'), ('cancelled', 'CANCELLED'))
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    amount = models.IntegerField()
    seat_number = models.CharField(max_length=3)
    status = models.CharField(choices=STATUS, max_length=138)
