from django.db import models

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Group(models.TextChoices):
        PRIMARY = "P", "Primary"
        SECONDARY = "S", "Secondary"

    group = models.CharField(
        max_length=20,
        choices=Group.choices
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "group"],
                name="unique_item_each_group"
            )
        ]

    # turn obj into text

    def __str__(self):
        return self.name
