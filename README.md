-----> Backend

    -Criar o ambiente virtual e ativar:
````
python -m venv env
. env/scripts/activate
````
    -desativar: deactivate
    
    -Ignorar env no .gitignore

    -Instalar o Django:
````
pip install django
pip install --upgrade pip           //Atualizar pip
pip install djangorestframework
````

    -Criar projeto:
````
django-admin startproject backend .
````
    -Testar:
````
python manage.py runserver
````
    -Criar app:
````
python manage.py startapp imc //imc porque é o nome do nosso app criado no amb virtual.
````
    -Incluir na pasta backend no arquivo settings.py em INSTALLED_APPS 'rest_framework' e 'imc' 
    
    
    -Criar modelo dentro da pasta imc em models.py e digitar um codigo, neste caso utilizei o seguinte:
````
from django.db import models


class Imc(models.Model):
    peso_altura = models.TextField()
    resultado = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        self.resultado = self.get_resultado
        super(Imc, self).save(*args, **kwargs)

    @property
    def get_resultado(self):
        peso, altura = list(map(float, self.peso_altura.split(',')))
        return peso / altura**2

    class Meta:

        verbose_name = "Imc"
        verbose_name_plural = "Imcs"

````

    -Criar o admin no arquivo admin.py em tasks:
````
            from django.contrib import admin
            from .models import Imc

            # Register your models here.
            admin.site.register(Imc)
````
    -Fazer as migrations e executar as mesmas, em seguida criar o superuser. Para isso, no terminal:
````
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
````
    -Cria um arquivo chamado serializers.py em imc e copia o codigo:
````
    from rest_framework import serializers
    from .models import Imc


    class ImcSerializers(serializers.ModelSerializer):

        class Meta:
            model = Imc
            fields = ('id', 'peso_altura', 'resultado')
            extra_kwargs = {
                'resultado': {
                    'read_only': True
                },
            }

````
    -Em views.py na pasta icm, colocar o codigo:
````
      from rest_framework import generics
      from .serializers import ImcSerializers
      from .models import Imc


    class ListCreateImc(generics.ListCreateAPIView):

        queryset = Imc.objects.all()
        serializer_class = ImcSerializers

````
    -Adicionar o seguinte codigo em urls.py na pasta backend dentro de urlpatterns
````
     from imc.views import ListCreateImc
     path('api/imc/', ListCreateImc.as_view()), 
````