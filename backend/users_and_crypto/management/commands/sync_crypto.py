from django.core.management.base import BaseCommand
from my_app.utils import sync_crypto_data

class Command(BaseCommand):
    help = 'Sync crypto data from external API'

    def handle(self, *args, **kwargs):
        sync_crypto_data()
        self.stdout.write(self.style.SUCCESS('Successfully synced crypto data'))