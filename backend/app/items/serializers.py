from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"

    def validate_name(self, value):
        if len(value) < 4:
            raise serializers.ValidationError(
                "Name cannot be empty"
            )
        return value
