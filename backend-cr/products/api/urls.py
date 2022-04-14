from django.urls import path
from . import views


urlpatterns = [
	path("private/categories/", views.categories),
	path("products/fetch/", views.products_fetch),
	path("products/create/", views.products_create),
	path("products/delete/", views.products_delete),
	path("products/search/",views.product_fetch_name),
	path("products/search_id/",views.product_fetch_id),
    path("products/image_upload/",views.product_image_upload),
	path("products/fetch_id/",views.products_fetch_cat_id),
]