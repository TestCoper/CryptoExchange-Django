from linecache import cache
from django.shortcuts import redirect, render, HttpResponse
from .forms import PayReqForm
from .models import Payment
from price.models import PriceCoin
import uuid
from datetime import datetime, timezone
from django.http import JsonResponse
import base64
import pprint
import pymongo
import requests

MONGO_HOST = "161.35.99.197"
MONGO_PORT = 56728
req = requests.session()


def PayPage(request, slug):
    paydit = Payment.objects.get(addres=slug)
    if (paydit.TxnAddres == None):
        return render(request, 'pay/index.html', {'data': paydit})
    else: 
        try:
            con = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
            if (paydit.SelNetwork == "bnb"):    
                user_table = con['parse']['BscTransactions']
                stat = user_table.find_one({"hash": paydit.TxnAddres, "to_address": "0x006bbb1672652676994925909cc444c4f06678fd"})['confirmed']
                print(stat)
            elif (paydit.SelNetwork == "eth" or paydit.SelNetwork == "pika" or paydit.SelNetwork == "usdc"):
                user_table = con['parse']['EthTransactions']
                stat = user_table.find_one({"hash": paydit.TxnAddres, "to_address": "0x006bbb1672652676994925909cc444c4f06678fd"})['confirmed']
            elif (paydit.SelNetwork == "poly"):
                user_table = con['parse']['PolygonTransactions']
                stat = user_table.find_one({"hash": paydit.TxnAddres, "to_address": "0x006bbb1672652676994925909cc444c4f06678fd"})['confirmed']            
        except :
            pass
        text = "✅New Transcripttion Accssepted \n\n\n Amount : " + str(paydit.Amount) + " " + str(paydit.TokenSend) + "\n\nToken Back : " + str(paydit.AmountBack) + " " + str(paydit.TokenWant) + "\n\n\nTxn : " + str(paydit.TxnAddres)
        print(text)
        req.get("https://api.telegram.org/bot5455891797:AAF6XtmyIak7lTiK1CSGQ6F7mdb8A48Na2c/sendMessage?parse_mode=HTML&chat_id=-1001709607133&text="+ text)
        return HttpResponse("transfer status : " + str(stat) + " and your txn : " + paydit.TxnAddres)

def GetPrice(request, slug):
    paydit = Payment.objects.get(addres=slug)
    return JsonResponse({"mab": paydit.Amount})


def SetTxn(request, slug, id2):
    #slutfe = slug.encode("UTF-8")
    #sldec = base64.a85decode(slutfe)
    #slutfd = sldec.decode("UTF-8")
    #idutfe = id2.encode("UTF-8")
    #iddec =  base64.a85decode(idutfe)
    #idutfd = iddec.decode("UTF-8")
    paydit = Payment.objects.get(CompString=slug)
    paydit.TxnAddres = id2
    paydit.save()
    return HttpResponse("i think ok -- " + slug + "-------" + id2)

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
            data.update({'SelNetwork': "pika"})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=11)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "pika"})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=12)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "pika"})
        elif (data['TokenSend'] == "PIKAU" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=13)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "pika"})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=14)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "poly"})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=15)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "poly"})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=16)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "poly"})
        elif (data['TokenSend'] == "Polygon" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=17)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "poly"})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=18)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "bnb"})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=19)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "bnb"})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=20)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "bnb"})
        elif (data['TokenSend'] == "BNB" and data['TokenWant'] == "USDC"):
            coindit = PriceCoin.objects.get(addres=21)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "bnb"})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "ETH"):
            coindit = PriceCoin.objects.get(addres=22)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "usdc"})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "PIKAU"):
            coindit = PriceCoin.objects.get(addres=23)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "usdc"})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "Polygon"):
            coindit = PriceCoin.objects.get(addres=24)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "usdc"})
        elif (data['TokenSend'] == "USDC" and data['TokenWant'] == "BNB"):
            coindit = PriceCoin.objects.get(addres=25)
            data.update({'AmountBack': coindit.ExchangePrice * float(data['Amount'])})
            data.update({'SelNetwork': "usdc"})
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