from django.db import models

from core.models import TimestampedModel


class Profile(TimestampedModel):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    user = models.OneToOneField(
        'authentication.User', on_delete=models.CASCADE
    )

    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)
    birthday = models.DateField(null=True)
    gender = models.CharField(max_length=1, blank=True, choices=GENDER_CHOICES)

   
    def __str__(self):
        return self.user.username

    def voted(self, campaign):
        self.votes.add(campaign)

    def has_voted(self, campaign):
        return self.votes.filter(pk=campaign.pk).exists()
