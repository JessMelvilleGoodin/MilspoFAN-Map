# Generated by Django 3.2.6 on 2021-09-03 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('milspofan_app', '0002_remove_artisticdiscipline_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ArtisticDiscipline',
            new_name='RecArtisticDiscipline',
        ),
    ]
