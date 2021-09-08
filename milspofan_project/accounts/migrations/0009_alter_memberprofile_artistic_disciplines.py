# Generated by Django 3.2.6 on 2021-09-08 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_memberprofile_artistic_disciplines'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memberprofile',
            name='artistic_disciplines',
            field=models.ManyToManyField(blank=True, default=[1, 2], related_name='members', to='accounts.MemberArtisticDiscipline'),
        ),
    ]