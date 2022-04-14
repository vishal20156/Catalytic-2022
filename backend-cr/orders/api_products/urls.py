from django.urls import path
from . import views


urlpatterns = [
	path("categories/", views.categories),
	path("fetch/", views.products_fetch),
	path("create/", views.products_create),
	path("delete/", views.products_delete),
	path("search/",views.product_fetch_name),
	path('<str:pk>/',views.getProduct, name = "getSingleProduct" ),
	path("search_id/",views.product_fetch_id),
    path("upload/",views.product_image_upload),
	path("fetch_id/",views.products_fetch_cat_id),
]