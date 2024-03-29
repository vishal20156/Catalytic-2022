from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Category(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100)

	def __str__(self):
		return self.name

class Product(models.Model):
	id = models.AutoField(primary_key=True)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	price = models.FloatField()
	description = models.TextField()
	countInStock = models.IntegerField(default=0)
	image = models.ImageField(null=True,blank=True,upload_to="images/")
	
	def __str__(self):
		return self.name

