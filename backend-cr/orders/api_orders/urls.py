from django.urls import path
from . import views

# TODO: add here your API URLs

urlpatterns = [
	path("order/add/", views.add_order),
	path("order/payment/update/",views.payment_status,name="paymentUpdate"),
	path("order/<str:pk>/",views.getOrderById,name="orderDetails"),
	path('',views.testing,name="testing"),
	path('order/delivery/update/',views.delivery_status,name="deliveryUpdate"),
	path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('profile/', views.getUserProfile, name="user_profile"),
	path('profile/update/', views.updateUserProfile, name="update_profile"),
	path('register/', views.registerUser, name="register"),
	path('users/', views.getUsers, name="getusers"),
    path('myorders/',views.getAllOrders,name="getorders"),
	path('getorders/',views.getOrders,name="getordersadin"),
	path('updatespreadsheet/',views.updateSpreadsheet,name="updateSpreadsheet"),
	path('updateorder/',views.updateOrderStatus,name="updateOrderStatus")

]
