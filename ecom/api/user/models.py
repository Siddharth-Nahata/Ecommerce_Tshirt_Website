from django.db import models
from django.contrib.auth.models import AbstractUser   # For Creating Custom user model
 
# Create your models here.

class CustomUser(AbstractUser):
    name=models.CharField(max_length=50,default='Anonymous')
    email=models.CharField(max_length=50,unique=True)           #We will be signing up the user with the help of email & password, not username

    username=None

    USERNAME_FIELD ='email'                                     #username field will be validated by email field
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=20,blank=True ,null=True)
    gender = models.CharField(max_length=10,blank=True ,null=True)

    session_token = models.CharField(max_length=10,default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    


