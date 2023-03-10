# Generated by Django 4.1.4 on 2022-12-27 10:38

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(default=None, max_length=50, unique=True)),
                ('website', models.CharField(default=None, max_length=50, unique=True)),
                ('phone', models.CharField(default=None, max_length=12)),
                ('location', models.IntegerField(default=1)),
                ('is_product', models.BooleanField(default=True)),
                ('about', models.TextField(blank=True, default=None, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='JobSkill',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(default=None, max_length=50, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='user',
            name='work_at',
            field=models.ForeignKey(blank=True, default=None, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.company'),
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(default=None, max_length=100)),
                ('salary', models.IntegerField(default=0)),
                ('level', models.IntegerField(default=0)),
                ('location', models.CharField(default=None, max_length=200)),
                ('detail', models.TextField(default=None)),
                ('of_company', models.ForeignKey(default=None, editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.company')),
                ('skills', models.ManyToManyField(default=None, to='api.jobskill')),
            ],
            options={
                'unique_together': {('title', 'of_company')},
            },
        ),
    ]
