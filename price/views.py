from django.http import JsonResponse, Http404
from .models import PriceCoin
from coinmarketcapapi import CoinMarketCapAPI, CoinMarketCapAPIError
from datetime import datetime, timezone, timedelta

REFRESH_INTERVAL = timedelta(seconds=70)

# TODO: Move to environment variable — this key is exposed in source control
CMC_API_KEY = 'f7c056ca-e2ce-4da6-8cc0-955c2e29ddd0'

# Maps URL coin name → CoinMarketCap API symbol (None = manually managed price)
COIN_CMC_SYMBOL = {
    "ETH": "ETH",
    "PIKAU": None,
    "Polygon": "MATIC",
    "BNB": "BNB",
    "USDC": "USDC",
}

# DB IDs for single-coin USD prices
SINGLE_COIN_DB_IDS = {
    "ETH": 1,
    "PIKAU": 2,
    "Polygon": 3,
    "BNB": 4,
    "USDC": 5,
}

# DB IDs for coin-pair exchange rates
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


def _refresh_if_stale(coin, cmc_symbol, convert="USD"):
    """Refresh price from CoinMarketCap if cached data is older than REFRESH_INTERVAL."""
    elapsed = datetime.now(timezone.utc) - coin.date_added
    if elapsed > REFRESH_INTERVAL:
        cmc = CoinMarketCapAPI(CMC_API_KEY)
        r = cmc.cryptocurrency_quotes_latest(symbol=cmc_symbol, convert=convert)
        coin.ExchangePrice = r.data[cmc_symbol]['quote'][convert]['price']
        coin.date_added = datetime.now(timezone.utc)
        coin.save()
        coin.refresh_from_db()


def get_single_price(request, coin_name):
    """Get the USD price of a single cryptocurrency."""
    if coin_name not in SINGLE_COIN_DB_IDS:
        raise Http404(f"Unknown coin: {coin_name}")

    coin = PriceCoin.objects.get(addres=SINGLE_COIN_DB_IDS[coin_name])
    cmc_symbol = COIN_CMC_SYMBOL.get(coin_name)

    if cmc_symbol:
        _refresh_if_stale(coin, cmc_symbol)

    return JsonResponse({"price": coin.ExchangePrice})


def get_pair_price(request, from_coin, to_coin):
    """Get the exchange rate between two cryptocurrencies."""
    pair = (from_coin, to_coin)
    if pair not in PAIR_DB_IDS:
        raise Http404(f"Unknown pair: {from_coin}/{to_coin}")

    coin = PriceCoin.objects.get(addres=PAIR_DB_IDS[pair])
    from_symbol = COIN_CMC_SYMBOL.get(from_coin)
    to_symbol = COIN_CMC_SYMBOL.get(to_coin)

    # Only auto-refresh pairs where both coins have a CMC symbol
    # (PIKAU pairs are manually managed)
    if from_symbol and to_symbol:
        _refresh_if_stale(coin, from_symbol, convert=to_symbol)

    return JsonResponse({"From": coin.From, "To": coin.To, "price": coin.ExchangePrice})
