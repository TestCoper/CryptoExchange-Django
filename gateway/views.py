from django.shortcuts import redirect, render, HttpResponse
from .forms import PayReqForm
from .models import Payment
from price.models import PriceCoin
import uuid
from datetime import datetime, timezone




def PayPage(request, slug):
    paydit = Payment.objects.get(addres=slug)
    return render(request, 'pay/index.html', {'data': paydit})


def PaymentReq(request):
    if request.method == "POST":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        data = request.POST.copy()
        if (data['TokenSend'] == "ETH" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=6)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "eth"})
        elif (data['TokenSend'] == "ETH" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=7)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "eth"})
        elif (data['TokenSend'] == "ETH" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=8)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "eth"})
        elif (data['TokenSend'] == "ETH" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=9)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "eth"})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=10)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=11)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=12)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=13)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=14)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=15)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=16)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=17)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=18)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=19)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=20)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=21)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=22)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=23)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=24)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=25)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
        else:
            return HttpResponse("403 Forbid")
        data.update({'meta_pay': True})
        data.update({'payeer_pay': False})
        data.update({'userIp': ip})
        data.update({'addres': uuid.uuid4().hex})
        data.update({'PaymentStat': "pending"})
        data.update({'SendSystemStat': "WaitingPayment"})
        data.update({'CompString': uuid.uuid4().hex})
        data.update({'CancelString': uuid.uuid4().hex})
        data.update({'date_added_pay': datetime.now(timezone.utc)})
        form = PayReqForm(data)
        if form.is_valid():
            form.save()
            addrPay = form.cleaned_data['addres']
            url = "/swap/pay/" + addrPay + "/"
            return redirect(url)
    else:
        pass
    return render(request, 'gateway/index.html')