from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    # customer level
    path('enroll', views.signup),
    path('login', views.login),
    path('reset', views.reset_password),

    # flight level
    path('search', views.search_flights),
    path('add-flight', views.add_flight),

    # booking level
    path('update', views.update_booking),
    path('available-seats', views.available_seats),
    path('book', views.book_tickets),
    path('cancel', views.cancel_booking),
    path('fetch-flights', views.fetch_flights),
    path('confirmed-flights', views.confirm_flights),

    # rewards level
    path('fetch-rewards', views.fetch_Rewards),
]