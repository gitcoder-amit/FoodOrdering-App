from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from django.contrib.auth import authenticate
from .models import *
from .serializers import CategorySerializer


# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_staff:
        return Response({'message': 'Admin logged in successfully', 'username': username}, status = 200)
    return Response({'message': 'Invalid credentials'}, status = 401)
    
    
@api_view(['POST'])
def add_category_api(request):
    category_name = request.data.get('category_name')
    Category.objects.create(category_name=category_name)
    return Response({'message': 'Category has been created'}, status = 201)


@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
    
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FoodSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_food_item(request):
    serializer = FoodSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Food Item has been added'}, status = 201)
    return Response({"message": "something went wrong"}, status = 400)



@api_view(['GET'])
def list_foods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def food_search(request):
    query = request.GET.get('q', '')
    foods = Food.objects.filter(item_name__icontains = query)
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

import random
@api_view(['GET'])
def random_foods(request):
    foods = list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    serializer = FoodSerializer(limited_foods, many=True)
    return Response(serializer.data)

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register_user(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    mobile = request.data.get('mobile')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(email = email).exists() or User.objects.filter(mobile = mobile).exists():
        return Response({"message": "Email or Mobile already registered"}, status = 200)
    User.objects.create(first_name=first_name, last_name=last_name, email=email, mobile = mobile, 
                        password=make_password(password))
    return Response({'message': 'User registered successfully'}, status = 201)

from django.contrib.auth.hashers import check_password
from django.db.models import Q  # Q is used if we want to give more than 1 condition
@api_view(['POST'])
def login_user(request):
    identifier = request.data.get('emailcontact')
    password = request.data.get('password')
    try:
        user =  User.objects.get(Q(email=identifier) |Q(mobile=identifier))
        if check_password(password, user.password):
            return Response({"message": "Login Successfully", "userId":user.id, "userName":f"{user.first_name} {user.last_name}"}, status = 200)
        else:
            return Response({'message': 'Invalid Credentials'}, status = 401) 
    except:
        return Response({'message': 'Invalid Credentials'}, status = 401) 
    
