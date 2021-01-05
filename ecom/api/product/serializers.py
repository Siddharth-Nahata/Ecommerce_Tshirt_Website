from rest_framework import serializers

from .models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    #this line is for getting entire url/link of the image.Since by default in django it doesn't give you full url.
    image = serializers.ImageField(max_length=None,allow_empty_file=False,allow_null=True,required=False) 
    
    class Meta:
        model=Product
        fields = ('id','name','description','price','image','category') 