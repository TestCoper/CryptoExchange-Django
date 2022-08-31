from django.db import models

class PriceCoin(models.Model):
    addres = models.SlugField(unique=True)
    ExchangePrice = models.FloatField()
    MinRecive = models.FloatField(null=True)
    From = models.CharField(max_length=40)
    To = models.CharField(max_length=40, null=True)
    date_added = models.DateTimeField()