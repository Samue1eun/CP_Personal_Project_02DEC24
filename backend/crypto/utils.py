from crypto.models import CryptoCurrency
import requests

# This function will be used to fetch the data from the API

def fetch_crypto_data():
    url = 'https://api.coincap.io/v2/assets'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()["data"]
    else:
        response.raise_for_status()

# This function will be used to sync the data from the API to the database

def sync_crypto_data():
    data = fetch_crypto_data()
    for crypto in data:
        CryptoCurrency.objects.update_or_create(
            id=crypto["id"],  # Use the id field from the API
            defaults={
                "name": crypto["name"],
                "symbol": crypto["symbol"],
                "rank": int(crypto["rank"]),
                "price": float(crypto["priceUsd"]),
                "market_cap": float(crypto["marketCapUsd"]),
                "supply": float(crypto["supply"]),
                "percent_change_24h": float(crypto["changePercent24Hr"])
            }
        )