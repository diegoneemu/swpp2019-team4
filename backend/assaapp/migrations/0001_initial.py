# Generated by Django 2.2.6 on 2019-10-30 16:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=32)),
                ('grade', models.IntegerField()),
                ('department', models.CharField(max_length=64)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester', models.CharField(default='', max_length=8)),
                ('classification', models.CharField(default='', max_length=8)),
                ('college', models.CharField(default='', max_length=16)),
                ('department', models.CharField(default='', max_length=32)),
                ('degree_program', models.CharField(default='', max_length=16)),
                ('academic_year', models.IntegerField(default=0)),
                ('course_number', models.CharField(default='', max_length=8)),
                ('lecture_number', models.CharField(default='', max_length=8)),
                ('title', models.CharField(default='', max_length=256)),
                ('subtitle', models.CharField(default='', max_length=256)),
                ('credit', models.IntegerField(default=0)),
                ('lecture_credit', models.IntegerField(default=0)),
                ('lab_credit', models.IntegerField(default=0)),
                ('lecture_type', models.CharField(default='', max_length=32)),
                ('location', models.CharField(default='', max_length=32)),
                ('professor', models.CharField(default='', max_length=16)),
                ('quota', models.CharField(default='', max_length=16)),
                ('remark', models.TextField(default='')),
                ('language', models.CharField(default='', max_length=16)),
                ('status', models.CharField(default='', max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='TimetableCourse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(default='#FFFFFF', max_length=8)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assaapp.Course')),
                ('timetable', models.ManyToManyField(related_name='timetables', to='assaapp.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Timetable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('semester', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CourseTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weekday', models.IntegerField(default=0)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assaapp.Course')),
            ],
        ),
    ]
