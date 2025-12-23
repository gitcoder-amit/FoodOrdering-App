from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)
    email = models.EmailField(max_length=50, null = True, unique=True)
    mobile = models.CharField(max_length=15, null=True)
    password = models.CharField(max_length=100, null=True)
    reg_date = models.DateTimeField(auto_now_add=True) # automatically set the field to now when the object is first created.

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
class Category(models.Model):
    category_name = models.CharField(max_length=50)
    creation_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.category_name}"


class Food(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # if we will delete category then all food items related to that category will be deleted
    item_name = models.CharField(max_length=50, null=True)
    item_price = models.DecimalField(max_digits= 10, decimal_places=2)
    item_description = models.TextField(max_length=500,null = True, blank=True)
    image = models.ImageField(upload_to = 'food_images/')  # images will be uploaded to media/food_images/ folder
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.item_name} {self.item_quantity}"
    



