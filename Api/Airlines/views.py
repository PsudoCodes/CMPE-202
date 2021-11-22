from django.http import HttpResponse
from django.shortcuts import render
from .models import Flight
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import Flight, Booking, Customer
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q, F
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime


@api_view(["POST"])
def add_customer(request):
    """
    enrolls customer
    :param request:
    :return:
    """

    if request.method == 'POST':
        info = json.loads(request.body)
        firstName = info.get('firstName')
        contact = info.get('contact')
        lastName = info.get('lastName')
        email = info.get('email')
        password = info.get('password')
        existing_customer = Customer.objects.filter(Q(contact=contact) | Q(email=email)).last()
        if existing_customer:
            raise Exception("Already exists")
        else:
            customer = Customer.objects.create(firstName=firstName, contact=contact, lastName=lastName, password=password, email=email)
            return Response({"customer_id": customer.id})
