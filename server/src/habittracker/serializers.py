from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["name", "description",
                  "finished", "priority"]

    # Sample validation
    # def validate_content(self, value):
    #     if len(value) > 240:
    #         raise serializers.ValidationError("This content is too long")
    #     return value
