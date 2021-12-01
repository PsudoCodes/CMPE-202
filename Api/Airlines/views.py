# python imports
import json
from datetime import datetime
import random
import string

# django imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# project imports
from .models import Flight, Booking, Customer


@api_view(["POST"])
def signup(request):
    """
    enrolls customer
    :param request:
    :return:
    """

    if request.method == 'POST':
        info = json.loads(request.body)
        first_name = info.get('first_name')
        last_name = info.get('last_name')
        contact = info.get('contact')
        address_line1 = info.get('address_line1')
        address_line2 = info.get('address_line2')
        city = info.get('city')
        state = info.get('state')
        zip_code = info.get('zip_code')
        email = info.get('email')
        password = info.get('password')
        userId = info.get('userId')
        existing_customer = Customer.objects.filter(Q(contact=contact) | Q(email=email)).last()
        if existing_customer:
            raise Exception("Already exists")
        else:
            customer = Customer.objects.create(first_name=first_name, contact=contact, last_name=last_name, city=city,
                                               address_line1=address_line1, address_line2=address_line2, email=email,
                                               state=state, zip_code=zip_code,userId=userId)
            User.objects.create_user(username=contact, email=email, password=password)
            return Response({"customer_id": customer.id})


@api_view(['GET'])
def login(request):
    """
    :param request:  username, password
    :return:
    """
    if request.METHOD == 'GET':
        username = request.GET.get('username')
        password = request.GET.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({"success": True})
        return Response({"success": False})


@api_view(["GET"])
def search_flights(request):
    """
    returns flights based on given filters
    :param request:
    :return:
    """
    if request.method == 'GET':
        from_location = request.GET.get('from_location')
        to_location = request.GET.get('to_location')
        travellers = request.GET.get('travellers')
        seat_type = request.GET.get('seat_type')
        departure = datetime.fromisoformat(request.GET.get('start'))
        arrival = datetime.fromisoformat(request.GET.get('drop'))

        queried_flights = Flight.objects.filter(from_location=from_location, to_location=to_location,
                                                departure=departure, arrival=arrival).exclude(available_seats=0)

        return Response({"results": queried_flights.values()})


@api_view(["POST"])
def book_tickets(request):
    """
    books ticket without seat number
    :param request:
    :return:
    """
    if request.method == 'POST':
        flight_number = request.data.get('flight_number')
        customer_id = request.data.get('customer_id')
        amount = request.data.get('amount')
        name_on_card = request.data.get('name_on_card')
        card_number = request.data.get('card_number')
        expiry_date = datetime.fromisoformat(request.data.get('expiry_date'))
        cvv = request.data.get('cvv')
        queried_flight = Flight.objects.filter(flight_number=flight_number, available_seats__gt=0).last()
        if queried_flight:
            existing_booking = Booking.objects.filter(customer_id=customer_id, flight_id=queried_flight.id).exclude(
                status=Booking.STATUS.cancelled
            )
            if existing_booking:
                raise Exception("Already booking exists!")
            else:
                booking_reference_id = ''.join([random.choice(string.ascii_uppercase + string.digits) for _ in range(8)])
                try:
                    booking = Booking.objects.create(customer_id=customer_id, flight_id=queried_flight.id, amount=amount,
                                                     status=Booking.STATUS.booked, card_number=card_number, cvv=cvv,
                                                     expiry_date=expiry_date, name_on_card=name_on_card,
                                                     booking_reference_id=booking_reference_id
                                                     )
                except Exception as e:
                    return Response({"error": "Try again", "details": e})
                queried_flight.available_seats = queried_flight.available_seats - 1
                queried_flight.save()
                return Response({"booking_details": model_to_dict(booking),
                                 "customer_details": model_to_dict(booking.customer),
                                 "flight_details": model_to_dict(booking.flight)}
                                )
	
@api_view(["GET"])
def fetch_Rewards(request):
    """
    returns rewards for a particular customer
    :param request:
    :return:
    """
    if request.method == 'GET':
        userId = request.GET.get('userId')
    
        queried_reward = Rewards.objects.filter(userId=userId)

        return Response({"results": queried_reward.values()})

@api_view(["GET"])
def confirm_flights(request):
    """
    returns confirmed booking for a particular customer
    :param request:
    :return:
    """
    if request.method == 'GET':
        userId = request.GET.get('userId')
    
        queried_reward = Booking.objects.filter(customer=customer)

        return Response({"results": queried_reward.values()})


