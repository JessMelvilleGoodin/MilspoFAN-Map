# Generated by Django 3.2.6 on 2021-09-07 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210903_0031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memberprofile',
            name='public_profile',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
