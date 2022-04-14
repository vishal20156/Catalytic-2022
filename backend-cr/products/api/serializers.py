from rest_framework import serializers
from django import forms
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):

	class Meta:
		model = Category
		fields = [
			"id",
			"name"
		]

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = "__all__"


class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'image']