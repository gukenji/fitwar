from django.contrib import admin

# Register your models here.
from .models import User, Refeicao, Alimento, Ingestao, Dispensa

admin.site.register(User)
admin.site.register(Refeicao)
admin.site.register(Alimento)
admin.site.register(Ingestao)
admin.site.register(Dispensa)
