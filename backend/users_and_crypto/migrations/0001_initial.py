# Generated by Django 5.1.3 on 2024-12-02 16:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CryptoCurrency',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('symbol', models.CharField(max_length=10, unique=True)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('market_cap', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('supply', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('rank', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='UserFavoritesCrypto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crypto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorited_by_user', to='users_and_crypto.cryptocurrency')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorite_cryptos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'crypto')},
            },
        ),
    ]