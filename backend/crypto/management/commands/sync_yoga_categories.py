from django.core.management.base import BaseCommand
from users_and_crypto.utils import fetch_yoga_categories, sync_yoga_categories

class Command(BaseCommand):
    help = 'Sync yoga categories from the Yoga API'

    def handle(self, *args, **kwargs):
        categories = fetch_yoga_categories()
        sync_yoga_categories(categories)
        self.stdout.write(self.style.SUCCESS('Successfully synced yoga categories'))