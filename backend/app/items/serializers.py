from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "name needs to be non empty"
            )
        return value
