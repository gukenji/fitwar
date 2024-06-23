# Generated by Django 5.0.2 on 2024-06-21 19:09

import base.managers
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('nome', models.CharField(default='', max_length=255)),
                ('email', models.EmailField(default='', max_length=254, unique=True)),
                ('peso', models.FloatField()),
                ('altura', models.IntegerField()),
                ('data_nascimento', models.DateField()),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='images/profile_pics/')),
                ('taxa_metabolica', models.FloatField(blank=True, default=1.3)),
                ('meta_calorias', models.IntegerField(blank=True, default=0)),
                ('genero', models.IntegerField(choices=[(1, 'MASCULINO'), (2, 'FEMININO')])),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
            managers=[
                ('objects', base.managers.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Alimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('marca', models.CharField(blank=True, max_length=255)),
                ('peso_referencia', models.FloatField()),
                ('carboidratos', models.FloatField()),
                ('proteinas', models.FloatField()),
                ('gorduras', models.FloatField()),
                ('calorias', models.FloatField()),
                ('codigo_barra', models.CharField(blank=True)),
                ('porcao_customizada', models.BooleanField()),
                ('descricao_porcao', models.CharField(blank=True, default=None, max_length=255)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Dispensa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alimentos', models.ManyToManyField(to='base.alimento')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ingestao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_ingestao', models.DateTimeField(default=django.utils.timezone.now)),
                ('alimentos', models.ManyToManyField(to='base.alimento')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Refeicao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('icone', models.CharField(blank=True, null=True)),
                ('alimentos', models.ManyToManyField(to='base.alimento')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]