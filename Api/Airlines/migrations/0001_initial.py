# Generated by Django 2.2 on 2021-11-21 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=138)),
                ('last_name', models.CharField(max_length=138)),
                ('contact', models.CharField(max_length=64, unique=True)),
                ('address_line1', models.CharField(max_length=90)),
                ('address_line2', models.CharField(max_length=90)),
                ('city', models.CharField(max_length=90)),
                ('state', models.CharField(max_length=90)),
                ('zip_code', models.CharField(max_length=90)),
                ('email', models.EmailField(max_length=138, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('airline', models.CharField(max_length=138)),
                ('flight_number', models.CharField(max_length=138, unique=True)),
                ('total_seats', models.IntegerField()),
                ('available_seats', models.IntegerField()),
                ('price', models.IntegerField()),
                ('from_location', models.CharField(max_length=183)),
                ('to_location', models.CharField(max_length=183)),
                ('duration', models.IntegerField()),
                ('departure', models.DateTimeField()),
                ('arrival', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking_reference_id', models.CharField(max_length=138, unique=True)),
                ('amount', models.IntegerField()),
                ('seat_number', models.CharField(max_length=3)),
                ('status', models.CharField(choices=[('booked', 'BOOKED'), ('cancelled', 'CANCELLED')], max_length=138)),
                ('seat_type', models.CharField(max_length=64)),
                ('name_on_card', models.CharField(max_length=190)),
                ('card_number', models.IntegerField()),
                ('expiry_date', models.DateTimeField()),
                ('cvv', models.IntegerField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Airlines.Customer')),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Airlines.Flight')),
            ],
        ),
    ]