from django.contrib import admin

# Register your models here.
from .models import User, Refeicao, Alimento, Ingestao, Estoque, AlimentoInstancia

admin.site.register(User)
admin.site.register(Refeicao)
admin.site.register(Alimento)
admin.site.register(Ingestao)
admin.site.register(Estoque)
admin.site.register(AlimentoInstancia)

