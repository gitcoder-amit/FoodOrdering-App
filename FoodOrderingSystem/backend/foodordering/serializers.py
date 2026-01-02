# django model ko json me convert (Serialzation)
# Json to django model conversion (Deserialization)


from .models import *
from rest_framework.serializers import ModelSerializer

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'creation_at']  # id is common for all models it is by default



