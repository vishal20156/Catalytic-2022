from rest_framework.views import APIView
from .models import Category, Product
import json
from rest_framework.response import Response
from .serializers import CategorySerializer, ProductSerializer, ImageUploadForm
from rest_framework.decorators import api_view


@api_view(http_method_names=["GET", "POST"])
def categories(request):
	if request.method == "POST":
		new_cat = Category.objects.create(name=request.data["category_name"])
		return Response(new_cat, status=200)
	categories_lst = Category.objects.all()
	srlz = CategorySerializer(categories_lst, many=True)
	return Response(srlz.data)

@api_view(http_method_names=["GET"])
def products_fetch_cat_id(request):
	if request.data["category_id"]:
		products_list = Product.objects.filter(category_id = request.data["category_id"])
	if products_list:
		srlz = ProductSerializer(products_list, many=True)
		return Response(srlz.data, status=200)
	else:
		return Response({"message": "Sorry not found!"}, status=404)

@api_view(http_method_names=["GET"])
def products_fetch(request):
	products_list = Product.objects.all()
	if products_list:
		srlz = ProductSerializer(products_list, many=True)
		return Response(srlz.data, status=200)
	else:
		return Response({"message": "Sorry not found!"}, status=404)


@api_view(http_method_names=["GET"])
def getProduct(request,pk):
	products_list = Product.objects.get(id=pk)
	if products_list:
		srlz = ProductSerializer(products_list, many=False)
		return Response(srlz.data, status=200)
	else:
		return Response({"message": "Sorry not found!"}, status=404)



@api_view(http_method_names=["POST"])
def product_fetch_name(request):
	if not request.data["name"]:
		return Response({"message": "Bad Request"}, status=400)
	product = Product.objects.filter(name=request.data["name"])
	srzl = ProductSerializer(product,many=True)
	return Response(srzl.data,status=200)

@api_view(http_method_names=["POST"])
def product_image_upload(request):
	form = ImageUploadForm(request.POST, request.FILES)
	if form.is_valid():
		product_object = Product.objects.get(name=form.cleaned_data["name"])
		form_to_upload = ImageUploadForm(request.POST, request.FILES,instance = product_object)
		form_to_upload.save()
		return Response({"message":"saved"}, status=200)


@api_view(http_method_names=["GET"])
def product_fetch_id(request):
	if request.data["id"] is not None:
		product = Product.objects.filter(id=request.data["id"])
		srzl = ProductSerializer(product,many=True)
		return Response(srzl.data,status=200)
	else:
		return Response({"message":"Bad Request"},status=400)


@api_view(http_method_names=["POST"])
def products_create(request):
	product_create_serializer = ProductSerializer(data = request.data)
	if product_create_serializer.is_valid():
		product_create_serializer.save()
		return Response({"message": "Product added successfully"}, status=200)
	else:
		return Response({"message":"Bad Request"},status=400)

@api_view(http_method_names=["DELETE"])
def products_delete(request):
	if not request.data["name"]:
		return Response({"message": "Sorry not found!"}, status=500)
	product = Product.objects.get(name=request.data["name"])
	product.delete()
	return Response({"message": "Product deleted successfully"}, status=200)