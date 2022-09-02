from .models import Payment
from django import forms
from django.forms import fields



class PayReqForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = (
            "addres",
            "Amount",
            "AmountBack",
            "TokenSend",
            "TokenWant",
            "PaymentStat",
            "SendSystemStat",
            "date_added_pay",
            "meta_pay",
            "payeer_pay",
            "CompString",
            'CancelString',
            "userIp",
            "SelNetwork",
            )