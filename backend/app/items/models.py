from django.db import models

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=255)
    group = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # turn obj into text
    def __str__(self):
        return self.name
