from django.db import models
from django.contrib.auth.models import User

class CryptoCurrency(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10, unique=True)
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    market_cap = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    supply = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    rank = models.IntegerField(default=0)
    percent_change_24h = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Name: {self.name} Symbol: {self.symbol} Price: {self.price} Market Cap: {self.market_cap} Supply: {self.supply} Rank: {self.rank}"

class UserFavoritesCrypto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_cryptos')
    crypto = models.ForeignKey(CryptoCurrency, on_delete=models.CASCADE, related_name='favorited_by_user')

    class Meta:
        unique_together = ('user', 'crypto')
    
    def __str__(self):
        return f"User: {self.user.username} Favorite Crypto: {self.crypto.name}"
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:20]}"
