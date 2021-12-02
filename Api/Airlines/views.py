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
from .models import Flight, Booking, Customer, Rewards, Mileage


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
                                               state=state, zip_code=zip_code)
            User.objects.create_user(username=email, first_name=first_name, email=email, password=password)

            return Response({"customer_id": customer.id})


@api_view(['POST'])
def login(request):
    """
    :param request:  username, password
    :return:
    """
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            customer_id = Customer.objects.get(email=email).id
            return Response({"customer_id": customer_id})
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
        info = json.loads(request.body)
        flight_number = info.get('flight_number')
        customer_id = info.get('customer_id')
        amount = info.get('amount')
        name_on_card = info.get('name_on_card')
        card_number = info.get('card_number')
        expiry_date = datetime.fromisoformat(info.get('expiry_date'))
        cvv = info.get('cvv')
        queried_flight = Flight.objects.filter(flight_number=flight_number, available_seats__gt=0).last()
        if queried_flight:
            existing_booking = Booking.objects.filter(customer_id=customer_id, flight_id=queried_flight.id).exclude(
                status=Booking.STATUS.cancelled
            )
            if existing_booking:
                raise Exception("Already booking exists!")
            else:
                booking_reference_id = ''.join(
                    [random.choice(string.ascii_uppercase + string.digits) for _ in range(8)])
                try:
                    booking = Booking.objects.create(customer_id=customer_id, flight_id=queried_flight.id,
                                                     amount=amount,
                                                     status=Booking.STATUS.booked, card_number=card_number, cvv=cvv,
                                                     expiry_date=expiry_date, name_on_card=name_on_card,
                                                     booking_reference_id=booking_reference_id
                                                     )
                    mileage = Mileage.objects.filter(to_location=queried_flight.to_location,
                                                         from_location=queried_flight.from_location).last()
                    if not mileage:
                        raise Exception(" No Mileage Found")

                    Rewards.objects.create(user_id=customer_id, booking_id=booking.id, mileage_id=mileage.id)
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
def fetch_flights(request):
    """
    returns confirmed booking for a particular customer
    :param request:
    :return:
    """
    if request.method == 'GET':
        customer = request.GET.get('customer')
    
        queried_reward = Booking.objects.filter(customer=customer)

        return Response({"results": queried_reward.values()})



@api_view(["POST"])
def update_booking(request):
    """
    Books seat for a given booking
    :param request:
    :return:
    """
    if request.method == 'POST':
        booking_reference_id = request.data.get('booking_reference_id')
        seat_number = request.data.get('seat_number')
        seat_type = request.data.get('seat_type')
        booking = Booking.objects.filter(booking_reference_id=booking_reference_id, status=Booking.STATUS.booked).last()
        if booking:
            booking.seat_number = seat_number
            booking.seat_type = seat_type
            booking.save()
            return Response({"success": 'true'})
        else:
            raise Exception("Invalid Booking Id")


@api_view(["POST"])
def cancel_booking(request):
    """
    changes booking status to cancelled
    :param request:
    :return:
    """
    if request.method == 'POST':
        booking_reference_id = request.data.get('booking_reference_id')
        booking = Booking.objects.filter(booking_reference_id=booking_reference_id).last()
        if booking:
            booking.status = Booking.STATUS.cancelled
            booking.save()
            flight = Flight.objects.filter(id=booking.flight_id).last()
            flight.available_seats = flight.available_seats+1
            flight.save()
            return Response({"success": 'true'})
        else:
            raise Exception("Invalid Booking Id")


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
                booking_reference_id = ''.join(
                    [random.choice(string.ascii_uppercase + string.digits) for _ in range(8)])
                try:
                    booking = Booking.objects.create(customer_id=customer_id, flight_id=queried_flight.id,
                                                     amount=amount,
                                                     status=Booking.STATUS.booked, card_number=card_number, cvv=cvv,
                                                     expiry_date=expiry_date, name_on_card=name_on_card,
                                                     booking_reference_id=booking_reference_id
                                                     )
                    mileage = Mileage.objects.filter(to_location=queried_flight.to_location,
                                                         from_location=queried_flight.from_location).last()
                    if not mileage:
                        raise Exception(" No Mileage Found")

                    Rewards.objects.create(user_id=customer_id, booking_id=booking.id, mileage_id=mileage.id)
                except Exception as e:
                    return Response({"error": "Try again", "details": e})
                queried_flight.available_seats = queried_flight.available_seats - 1
                queried_flight.save()
                return Response({"booking_details": model_to_dict(booking),
                                 "customer_details": model_to_dict(booking.customer),
                                 "flight_details": model_to_dict(booking.flight)}
                                )


@api_view(["GET"])
def available_seats(request):
    """
    returns list of seats booked in the given flight
    :param request:
    :return:
    """
    if request.method == 'GET':
        myset = {"1A", "1B", "1C", "1D", "1E", "1F", "2A", "2B", "2C", "2D", "2E", "2F" , "A4"}
        flight_number = request.GET.get('flight_number')
        flight = Flight.objects.filter(flight_number=flight_number).last()
        booked_seats = list(Booking.objects.filter(flight_id=flight.id, status=Booking.STATUS.booked)
                            . values_list('seat_number', flat=True))
        print(myset)
        print(set(booked_seats))
        available_seats = myset - set(booked_seats)
        return Response({"available_seats": available_seats})


@api_view(["POST"])
def add_flight(request):
    """
    adds new flight to system
    :param request:
    :return:
    """
    if request.method == 'POST':
        info = json.loads(request.body)
        flight_number = ''.join([random.choice(string.ascii_uppercase + string.digits) for _ in range(5)])
        data = {
            "airline": info.get('airline'),
            "total_seats": info.get('total_seats'),
            "available_seats": info.get('available_seats'),
            "price": info.get('price'),
            "from_location": info.get('from_location'),
            "to_location": info.get('to_location'),
            "duration": info.get('duration'),
            "departure": datetime.fromisoformat(info.get('departure')),
            "arrival": datetime.fromisoformat(info.get('arrival')),
            "flight_number": flight_number
        }

        Flight.objects.create(**data)
        return Response({"success": 'True'})


@api_view(['GET'])
def reset_password(request):
    """
    :param request: username, old_password, new_password
    :return:
    """
    if request.METHOD == 'GET':
        username = request.GET.get('username')
        password = request.GET.get('old_password')
        new_password = request.GET.get('new_password')
        user = authenticate(username=username, password=password)
        if user:
            user.set_password(new_password)
            user.save()
            return Response({"success": True})
        return Response({"error": "Invalid username or password!"})


@api_view(["GET"])
def confirm_flights(request):
    """
    returns rewards for a particular customer
    :param request:
    :return:
    """
    if request.method == 'GET':
        customer = request.GET.get('customer')
        bookings = Booking.objects.filter(customer_id=customer).select_related('flight')
        response = []
        for booking in bookings:
            elem = {**model_to_dict(booking), **model_to_dict(booking.flight)}
            response.append(elem)
        print(type(response))
        return Response({"results": response})


@api_view(["GET"])
def fetch_Rewards(request):
    """
    returns rewards for a particular customer
    :param request:
    :return:
    """
    if request.method == 'GET':
        customer = request.GET.get('customer')

        booked_seats = sum(list(Rewards.objects.filter(user_id=customer)
                    .values_list('mileage__mileage_points', flat=True)))
        return Response({"results": booked_seats})
