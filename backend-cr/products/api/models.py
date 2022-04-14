from django.db import models

# Create your models here.
class Category(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)

class Product(models.Model):
	id = models.AutoField(primary_key=True)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	price = models.FloatField()
	description = models.TextField()
	countInStock = models.IntegerField(default=0)
	image = models.FileField(null=True,blank=True,upload_to="images/")