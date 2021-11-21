# Generated by Django 2.2 on 2021-11-19 21:34

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
                ('name', models.CharField(max_length=138)),
                ('contact', models.CharField(max_length=64, unique=True)),
                ('address', models.CharField(max_length=190)),
                ('email', models.EmailField(max_length=138, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('airline', models.CharField(max_length=138)),
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
                ('amount', models.IntegerField()),
                ('seat_number', models.CharField(max_length=3)),
                ('status', models.CharField(choices=[('booked', 'BOOKED'), ('cancelled', 'CANCELLED')], max_length=138)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Airlines.Customer')),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Airlines.Flight')),
            ],
        ),
    ]
