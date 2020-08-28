from django.conf import settings
from django.db import models

# Create your models here.

User = settings.AUTH_USER_MODEL


class Todo(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date_created = models.DateField()
    date_finished = models.DateField()
    finished = models.BooleanField()
    priority = models.IntegerField()
    user_uid = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
