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
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH')
        pr = r.data['ETH']['quote']['USD']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=1)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Pika(request):
    coindit = PriceCoin.objects.get(addres=2)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Polygon(request):
    coindit = PriceCoin.objects.get(addres=3)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='MATIC')
        pr = r.data['MATIC']['quote']['USD']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=3)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def Bnb(request):
    coindit = PriceCoin.objects.get(addres=4)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='BNB')
        pr = r.data['BNB']['quote']['USD']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=4)
    return JsonResponse({"price": coindit.ExchangePrice})

def Usdc(request):
    coindit = PriceCoin.objects.get(addres=5)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='USDC')
        pr = r.data['USDC']['quote']['USD']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=5)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def EthPika(request):
    coindit = PriceCoin.objects.get(addres=6)
    return JsonResponse({"price": coindit.ExchangePrice})
    

def EthPolygon(request):
    coindit = PriceCoin.objects.get(addres=7)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH', convert="MATIC")
        pr = r.data['ETH']['quote']['MATIC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=7)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def EthBnb(request):
    coindit = PriceCoin.objects.get(addres=8)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH', convert="BNB")
        pr = r.data['ETH']['quote']['BNB']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=8)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def EthUsdc(request):
    coindit = PriceCoin.objects.get(addres=9)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='ETH', convert="USDC")
        pr = r.data['ETH']['quote']['USDC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=9)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PikaEth(request):
    coindit = PriceCoin.objects.get(addres=10)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PikaPolygon(request):
    coindit = PriceCoin.objects.get(addres=11)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PikaBnb(request):
    coindit = PriceCoin.objects.get(addres=12)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PikaUsdc(request):
    coindit = PriceCoin.objects.get(addres=13)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PolygonEth(request):
    coindit = PriceCoin.objects.get(addres=14)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='MATIC', convert="ETH")
        pr = r.data['MATIC']['quote']['ETH']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=14)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PolygonPika(request):
    coindit = PriceCoin.objects.get(addres=15)
    return JsonResponse(coindit.ExchangePrice)
    

def PolygonBnb(request):
    coindit = PriceCoin.objects.get(addres=16)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='MATIC', convert="BNB")
        pr = r.data['MATIC']['quote']['BNB']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=16)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def PolygonUsdc(request):
    coindit = PriceCoin.objects.get(addres=17)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='MATIC', convert="USDC")
        pr = r.data['MATIC']['quote']['USDC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=17)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def BnbEth(request):
    coindit = PriceCoin.objects.get(addres=18)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='BNB', convert="ETH")
        pr = r.data['BNB']['quote']['ETH']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=18)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def BnbPika(request):
    coindit = PriceCoin.objects.get(addres=19)
    return JsonResponse(coindit.ExchangePrice)
    

def BnbPolygon(request):
    coindit = PriceCoin.objects.get(addres=20)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='BNB', convert="MATIC")
        pr = r.data['BNB']['quote']['MATIC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=20)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def BnbUsdc(request):
    coindit = PriceCoin.objects.get(addres=21)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='BNB', convert="USDC")
        pr = r.data['BNB']['quote']['USDC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=21)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def UsdcEth(request):
    coindit = PriceCoin.objects.get(addres=22)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='USDC', convert="ETH")
        pr = r.data['USDC']['quote']['ETH']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=22)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def UsdcPika(request):
    coindit = PriceCoin.objects.get(addres=23)
    return JsonResponse(coindit.ExchangePrice)
    

def UsdcPolygon(request):
    coindit = PriceCoin.objects.get(addres=24)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='USDC', convert="MATIC")
        pr = r.data['USDC']['quote']['MATIC']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=24)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    

def UsdcBnb(request):
    coindit = PriceCoin.objects.get(addres=25)
    reqabl = coindit.date_added
    now = datetime.now(timezone.utc)
    ekh = now - reqabl
    if ( ekh > reltime):
        cmc = CoinMarketCapAPI('f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0')
        r = cmc.cryptocurrency_quotes_latest(symbol='USDC', convert="BNB")
        pr = r.data['USDC']['quote']['BNB']['price']
        coindit.ExchangePrice = pr
        coindit.date_added = datetime.now(timezone.utc)
        coindit.save()
        coindit = PriceCoin.objects.get(addres=25)
    return JsonResponse({"From": coindit.From, "To": coindit.To, "price": coindit.ExchangePrice})
    


