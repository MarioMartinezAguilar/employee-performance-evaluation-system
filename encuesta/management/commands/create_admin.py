from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Crear superusuario automáticamente'

    def handle(self, *args, **kwargs):

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        email =  os.environ.get("DJANGO_SUPERUSER_EMAIL")
        
        if not username or not password or not email:
            self.stdout.write(
                self.style.ERROR(
                    "Faltan variables de entorno para crear el superusuario."
                )
            )
            return

        if not User.objects.filter(username=username).exists():

            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Superusuario {username} creado correctamente'
                )
            )

        else:
            self.stdout.write(
                self.style.WARNING(
                    f'El usuario {username} ya existe'
                )
            )