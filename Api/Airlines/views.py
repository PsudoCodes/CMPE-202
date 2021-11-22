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
        existing_customer = Customer.objects.filter(Q(contact=contact) | Q(email=email)).last()
        if existing_customer:
            raise Exception("Already exists")
        else:
            customer = Customer.objects.create(first_name=first_name, contact=contact, last_name=last_name, city=city,
                                               address_line1=address_line1, address_line2=address_line2, email=email,
                                               state=state, zip_code=zip_code)
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

