from django.http import JsonResponse
from .models import PriceCoin
from coinmarketcapapi import CoinMarketCapAPI, CoinMarketCapAPIError
from datetime import datetime, timezone, timedelta


reltime = timedelta(seconds=70)
def Eth(request):
    coindit = PriceCoin.objects.get(addres=1)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    print(type(ekh))
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH')
        pr = r.data['ETH']['quote']['USD']['price']
        priceToSave = round(pr, 2)
        coindit.ExchangePrice = priceToSave
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=1)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Pika(request):
    coindit = PriceCoin.objects.get(addres=2)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    print(type(ekh))
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH')
        pr = r.data['ETH']['quote']['USD']['price']
        priceToSave = round(pr, 2)
        coindit.ExchangePrice = priceToSave
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=2)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Polygon(request):
    coindit = PriceCoin.objects.get(addres=3)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    print(type(ekh))
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='MATIC')
        pr = r.data['MATIC']['quote']['USD']['price']
        priceToSave = round(pr, 2)
        coindit.ExchangePrice = priceToSave
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=3)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Bnb(request):
    coindit = PriceCoin.objects.get(addres=4)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    print(type(ekh))
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='BNB')
        pr = r.data['BNB']['quote']['USD']['price']
        priceToSave = round(pr, 2)
        coindit.ExchangePrice = priceToSave
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=4)
    return JsonResponse({"price": coindit.ExchangePrice})

def Usdc(request):
    coindit = PriceCoin.objects.get(addres=5)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    print(type(ekh))
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='USDC')
        pr = r.data['USDC']['quote']['USD']['price']
        priceToSave = round(pr, 2)
        coindit.ExchangePrice = priceToSave
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=5)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def EthPika(request):
    coindit = PriceCoin.objects.get(addres=6)
    return JsonResponse(coindit.ExchangePrice)
    

def EthPolygon(request):
    coindit = PriceCoin.objects.get(addres=7)
    return JsonResponse(coindit.ExchangePrice)
    

def EthBnb(request):
    coindit = PriceCoin.objects.get(addres=8)
    return JsonResponse(coindit.ExchangePrice)
    

def EthUsdc(request):
    coindit = PriceCoin.objects.get(addres=9)
    return JsonResponse(coindit.ExchangePrice)
    

def PikaEth(request):
    coindit = PriceCoin.objects.get(addres=10)
    return JsonResponse(coindit.ExchangePrice)
    

def PikaPolygon(request):
    coindit = PriceCoin.objects.get(addres=11)
    return JsonResponse(coindit.ExchangePrice)
    

def PikaBnb(request):
    coindit = PriceCoin.objects.get(addres=12)
    return JsonResponse(coindit.ExchangePrice)
    

def PikaUsdc(request):
    coindit = PriceCoin.objects.get(addres=13)
    return JsonResponse(coindit.ExchangePrice)
    

def PolygonEth(request):
    coindit = PriceCoin.objects.get(addres=14)
    return JsonResponse(coindit.ExchangePrice)
    

def PolygonPika(request):
    coindit = PriceCoin.objects.get(addres=15)
    return JsonResponse(coindit.ExchangePrice)
    

def PolygonBnb(request):
    coindit = PriceCoin.objects.get(addres=16)
    return JsonResponse(coindit.ExchangePrice)
    

def PolygonUsdc(request):
    coindit = PriceCoin.objects.get(addres=17)
    return JsonResponse(coindit.ExchangePrice)
    

def BnbEth(request):
    coindit = PriceCoin.objects.get(addres=18)
    return JsonResponse(coindit.ExchangePrice)
    

def BnbPika(request):
    coindit = PriceCoin.objects.get(addres=19)
    return JsonResponse(coindit.ExchangePrice)
    

def BnbPolygon(request):
    coindit = PriceCoin.objects.get(addres=20)
    return JsonResponse(coindit.ExchangePrice)
    

def BnbUsdc(request):
    coindit = PriceCoin.objects.get(addres=21)
    return JsonResponse(coindit.ExchangePrice)
    

def UsdcEth(request):
    coindit = PriceCoin.objects.get(addres=22)
    return JsonResponse(coindit.ExchangePrice)
    

def UsdcPika(request):
    coindit = PriceCoin.objects.get(addres=23)
    return JsonResponse(coindit.ExchangePrice)
    

def UsdcPolygon(request):
    coindit = PriceCoin.objects.get(addres=24)
    return JsonResponse(coindit.ExchangePrice)
    

def UsdcBnb(request):
    coindit = PriceCoin.objects.get(addres=25)
    return JsonResponse(coindit.ExchangePrice)
    


