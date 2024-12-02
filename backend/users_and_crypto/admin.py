from django.contrib import admin
from .models import CryptoCurrency, UserFavoritesCrypto

# Register your models here.
admin.site.register(CryptoCurrency)
admin.site.register(UserFavoritesCrypto)