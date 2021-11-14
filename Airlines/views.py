from django.http import HttpResponse
from django.shortcuts import render
from .models import Flight
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from datetime import datetime


# Create your views here.
# goldSilver
@csrf_exempt
@api_view(['GET', 'POST'])
def create_flight(request):
    if request.method == "POST":
        flight_number = request.data.get("flight_number")
        departure_time = datetime.strptime(request.data.get("departure_time"), "%Y-%m-%d").date()
        arrival_time = datetime.now()
        duration_in_minutes = request.data.get("durationInMinutes")
        Flight.objects.create(flight_number=flight_number, departure_time=departure_time,
                              arrival_time=arrival_time, durationInMinutes=duration_in_minutes)
        print("Object Created")
    return HttpResponse("Flight Created")


@csrf_exempt
@api_view(['GET'])
def flight_details(request):
    if request.method == "GET":
        # flight_number = request.GET.get("flight_number")
        # duration_in_minutes = request.POST.get("durationInMinutes")
        all_flights = list(Flight.objects.values())

    return HttpResponse(all_flights)


@api_view(['GET'])
def get_flight(request):
    if request.method == "GET":
        flight_number = request.GET.get("flight_number")
        # duration_in_minutes = request.POST.get("durationInMinutes")
        all_flights = Flight.objects.filter(flight_number=flight_number).values()
    return HttpResponse(all_flights)
