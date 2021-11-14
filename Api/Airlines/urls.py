from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('create/', views.create_flight ),
    path('flights/', views.flight_details),
    path('flight/', views.get_flight),
]
