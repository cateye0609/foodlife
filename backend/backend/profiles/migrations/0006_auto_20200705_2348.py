# Generated by Django 3.0.7 on 2020-07-05 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20200705_2346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
