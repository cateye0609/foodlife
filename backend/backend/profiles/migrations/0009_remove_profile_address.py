# Generated by Django 3.0.7 on 2020-07-05 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0008_profile_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='address',
        ),
    ]
