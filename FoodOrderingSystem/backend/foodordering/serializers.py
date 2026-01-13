# django model ko json me convert (Serialzation)
# Json to django model conversion (Deserialization)


from .models import *
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'creation_at']  # id is common for all models it is by default


class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.category_name', read_only=True)
    image = serializers.ImageField(required=False)
    is_available = serializers.BooleanField(required=False,default=True)
    class Meta:
        model = Food
        fields = ['id', 'category', 'category_name', 'item_name', 'item_price', 'item_description', 'item_quantity', 'is_available', 'image']



