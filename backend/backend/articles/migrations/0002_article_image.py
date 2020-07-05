# Generated by Django 3.0.7 on 2020-06-30 15:55
from django.contrib.postgres.operations import UnaccentExtension

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        UnaccentExtension(),
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]