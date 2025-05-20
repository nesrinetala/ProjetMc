from django.core.management.base import BaseCommand
from votre_app.models import Administrateur

class Command(BaseCommand):
    help = 'Crée le compte administrateur par défaut'

    def handle(self, *args, **options):
        admin = Administrateur.create_admin()
        self.stdout.write(self.style.SUCCESS(f'Admin créé: {admin.username}'))