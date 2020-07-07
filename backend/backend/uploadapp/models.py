from django.db import models
from core.models import TimestampedModel


class File(TimestampedModel):
    link = models.FileField(blank=False, null=False)
    description = models.CharField(max_length=255, default='')

    def __str__(self):
        return '{} ({})'.format(self.description, self.link)
