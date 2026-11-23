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

# Maps TokenSend value → blockchain network identifier
TOKEN_NETWORK_MAP = {
    "ETH": "eth",
    "PIKAU": "pika",
    "Polygon": "poly",
    "BNB": "bnb",
    "USDC": "usdc",
}

# Maps (TokenSend, TokenWant) → PriceCoin DB id
PAIR_DB_IDS = {
    ("ETH", "PIKAU"): 6,
    ("ETH", "Polygon"): 7,
    ("ETH", "BNB"): 8,
    ("ETH", "USDC"): 9,
    ("PIKAU", "ETH"): 10,
    ("PIKAU", "Polygon"): 11,
    ("PIKAU", "BNB"): 12,
    ("PIKAU", "USDC"): 13,
    ("Polygon", "ETH"): 14,
    ("Polygon", "PIKAU"): 15,
    ("Polygon", "BNB"): 16,
    ("Polygon", "USDC"): 17,
    ("BNB", "ETH"): 18,
    ("BNB", "PIKAU"): 19,
    ("BNB", "Polygon"): 20,
    ("BNB", "USDC"): 21,
    ("USDC", "ETH"): 22,
    ("USDC", "PIKAU"): 23,
    ("USDC", "Polygon"): 24,
    ("USDC", "BNB"): 25,
}


def PaymentReq(request):
    if request.method == "POST":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        data = request.POST.copy()
        pair = (data['TokenSend'], data['TokenWant'])

        if pair not in PAIR_DB_IDS:
            return HttpResponse("403 Forbid")

        coindit = PriceCoin.objects.get(addres=PAIR_DB_IDS[pair])
        data.update({
            'AmountBack': coindit.ExchangePrice * float(data['Amount']),
            'SelNetwork': TOKEN_NETWORK_MAP[data['TokenSend']],
            'meta_pay': True,
            'payeer_pay': False,
            'userIp': ip,
            'addres': uuid.uuid4().hex,
            'PaymentStat': "pending",
            'SendSystemStat': "WaitingPayment",
            'CompString': uuid.uuid4().hex,
            'CancelString': uuid.uuid4().hex,
            'date_added_pay': datetime.now(timezone.utc),
        })
        form = PayReqForm(data)
        if form.is_valid():
            form.save()
            addrPay = form.cleaned_data['addres']
            url = "/swap/pay/" + addrPay + "/"
            return redirect(url)
    else:
        pass
    return render(request, 'gateway/index.html')