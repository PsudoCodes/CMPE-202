from django.contrib import admin

# Register your models here.
from .models import Flight, Customer, Booking


admin.site.register(Flight)
admin.site.register(Customer)
admin.site.register(Booking)

