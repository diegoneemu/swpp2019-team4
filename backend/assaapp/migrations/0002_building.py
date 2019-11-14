# Generated by Django 2.2.6 on 2019-11-14 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assaapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='default', max_length=8)),
                ('x', models.DecimalField(decimal_places=8, max_digits=16)),
                ('y', models.DecimalField(decimal_places=8, max_digits=16)),
            ],
        ),
    ]
