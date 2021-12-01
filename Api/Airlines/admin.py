from django.contrib import admin

# Register your models here.
from .models import Flight, Customer, Booking, Mileage, Rewards

admin.site.register(Flight)
admin.site.register(Customer)
admin.site.register(Booking)
admin.site.register(Mileage)
admin.site.register(Rewards)