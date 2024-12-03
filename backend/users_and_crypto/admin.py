from django.contrib import admin
from .models import CryptoCurrency, UserFavoritesCrypto, Post

# Register your models here.
admin.site.register(CryptoCurrency)
admin.site.register(UserFavoritesCrypto)
admin.site.register(Post)