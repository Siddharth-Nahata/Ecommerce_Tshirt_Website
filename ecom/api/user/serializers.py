from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes,permission_classes

from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):                           #For creating new user
        password = validated_data.pop('password',None)          #validated_data is a key value so we can use pop.It will remove the password.If the password is not available it will return None
        instance = self.Meta.model(**validated_data)            #Instance will be interacting with the model and saving based on it.

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):                 #Allowing user to update the field as well #The reason why we are getting instance here is,the problem of which user I update is resolved through this.
        for attr,value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)                     #for setting password we have to use set_password()
            else:
                setattr(instance,attr,value)

        instance.save()
        return instance
    class Meta:
        model = CustomUser
        extra_kwargs={'password':{'write_only':True}}     #Extra parameter that we want to hinder with database
        fields = ('name','email','password','phone','gender','is_active','is_staff','is_superuser')
                                                            #These 3 are from AbstractUser model