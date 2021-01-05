from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category                           #which model is to be serialized
        fields = ('name','description')            #which fields needs to be serialized