from django.core.management.base import BaseCommand
from crypto.utils import sync_crypto_data

class Command(BaseCommand):
    help = 'Sync crypto data from external API'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting data synchronization...')
        try:
            sync_crypto_data()
            self.stdout.write(self.style.SUCCESS('Successfully synced crypto data'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error syncing crypto data: {e}'))