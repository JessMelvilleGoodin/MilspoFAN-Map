# Generated by Django 3.2.6 on 2021-09-08 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_auto_20210908_0208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memberprofile',
            name='hashtags',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]
