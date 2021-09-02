# Generated by Django 3.2.6 on 2021-09-01 17:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('milspofan_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artisticdiscipline',
            name='recommendations',
        ),
        migrations.AddField(
            model_name='recommendation',
            name='artistic_disciplines',
            field=models.ManyToManyField(blank=True, related_name='recommendations', to='milspofan_app.ArtisticDiscipline'),
        ),
        migrations.AlterField(
            model_name='artisticdiscipline',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='artistic_disciplines', to=settings.AUTH_USER_MODEL),
        ),
    ]
