# Generated by Django 3.2.6 on 2021-09-10 18:03

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_memberprofile_website'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memberprofile',
            name='artistic_disciplines',
        ),
        migrations.AddField(
            model_name='memberprofile',
            name='artistic_disciplines',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50, null=True), default=['Dance', 'Poetry', 'Music', 'Painting'], size=None),
            preserve_default=False,
        ),
    ]