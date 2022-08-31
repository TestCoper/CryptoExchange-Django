from django.db import models



class Payment(models.Model):
    addres = models.SlugField(unique=True)
    Amount = models.FloatField()
    AmountBack = models.FloatField()
    TokenSend = models.CharField(max_length=40)
    TokenWant = models.CharField(max_length=40)
    PaymentStat = models.CharField(max_length=40, null=True)
    SendSystemStat = models.CharField(max_length=40, null=True)
    date_added_pay = models.DateTimeField()
    TxnAddres = models.CharField(max_length=70, null=True)
    CompString = models.CharField(max_length=40, null=True)
    CancelString = models.CharField(max_length=40, null=True)
    userIp = models.CharField(max_length=40)
    is_limit = models.BooleanField(null=True)
    meta_pay = models.BooleanField()
    payeer_pay = models.BooleanField()