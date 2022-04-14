from calendar import c
from http.client import HTTPResponse
import re
from django.http import HttpResponse
from django.shortcuts import render

import razorpay
from .models import Order
from .serializers import OrderSerializer,ProductSerializer, UserSerializer,UserSerializerWithToken, OrderSuccessSerializer
from .models import extendedUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.apps import apps
product = apps.get_model('api_products','Product')
from rest_framework import status
import datetime
import os
from twilio.rest import Client
from sheet2api import Sheet2APIClient
import gspread

import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'C:/Users/divya/AppData/Roaming/gspread/service_account.json'
creds = None
creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

SAMPLE_SPREADSHEET_ID = '1i7z5__s-ctBU1q990SCb0Caxl377BAADYhT9g2tSf0A'

from django.conf import settings
from django.core.mail import send_mail

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def Convert(lst):
    res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
    return res_dct


def testing(request):
    return render(request, 'paymentsummary.html', {})


@api_view(['POST'])
def registerUser(request):
    print(request.data)
    data = request.data
  
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        
        )
        
        ph = data['contact']
        eh = extendedUser(phone_no=ph,user=user)
        eh.save()
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user =request.user 
    serializer = UserSerializerWithToken(user,many = False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] !="":
        user.password= make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user =request.user 
    serializer = UserSerializer(user,many = False)
    return Response(serializer.data)
    



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    szlr = UserSerializer(users, many=True)
    return Response(szlr.data)

@api_view(http_method_names=["POST"])
@permission_classes([IsAuthenticated])
def add_order(request):
    if(request.data):
        user = request.user
        data = request.data
        orderItems = data['orderItems']
        paymentMethod = data['paymentMethod']
        if len(orderItems) == 0:
            return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
        else:
            order = Order()
            order.cart = []
            order.user = user
            for ele in orderItems:
                products = product.objects.get(id=ele['product_id'])
                order.cart.append({
                    "item_id": ele["product_id"],
                    "item_name": ele["name"],
                    "item_qty": ele["qty"],
                })

                #In case if the stock goes below 0, this will handle in avoiding invalid length array exception
                if products.countInStock > 0:

                    products.countInStock -= ele["qty"]
                else:
                    products.countInStock = 0
                products.save()
            order.amount = data['totalPrice']
            order.shippingAddress = data['shippingAddress']
            order.timestamp_updated_at = datetime.datetime.now()
            order.timestamp_created_at = datetime.datetime.now()
            order.save()
            
            print("Order is recieved")
            #Sending a mail to admin saying a order is recieved.
            subject = 'Order Recieved!!'
            order_items = []
            for item in order.cart:
                order_items.append((item['item_name'],item['item_qty']))
            print(order_items)
            crt = ''
            for itemName,itemQty in order_items:
                if len(order_items) > 1:
                    crt+=f'Item Name - {itemName} and Quantity - {itemQty} , '
                else:
                    crt+=f'Item Name - {itemName} and Quantity - {itemQty}'


            message = f'A new order has been placed by {order.user.first_name} with the following items - {crt} and the total amount is {order.amount}'
            email_from = settings.EMAIL_HOST_USER
            admin_mail = "catalyticrasoi@gmail.com"
            admin_mail = "catalyticrasoi@gmail.com"
            recipient_list = [admin_mail, ]
            send_mail( subject, message, email_from, recipient_list )



            #Sending message to user that their order is recieved
            datas = extendedUser.objects.get(user=user)
            print(datas.phone_no)
            account_sid = "AC07d653ba1e9c29f6d376a8372acbdb22"
            auth_token =  "615710f51145b8e96afe101148d9bce6"
            client = Client(account_sid, auth_token)

            message = client.messages \
                .create(
                     body=f"Hey {order.user.first_name} Thankyou for shopping with catalytic rasoi, your order is confirmed with order amount of {order.amount}",
                     from_='+19087748233',
                     to=f'+91{datas.phone_no}'
                 )


            #saving the order to spreadsheet using sheets2api
            service = build('sheets','v4',credentials=creds)
            sheet = service.spreadsheets()
            result = sheet.values().get(spreadsheetId = SAMPLE_SPREADSHEET_ID,range="Website_Orders!A1:C3").execute()
            o_id = order.order_id
            c_name = user.first_name
            itemss = [i['item_name'] for i in order.cart]
            pay_method = paymentMethod
            del_area = str(data['shippingAddress']['address']+" " + data['shippingAddress']['city'])
            del_charges = 0
            t_amt = data['totalPrice']
            o_date = str(order.timestamp_created_at)
            item_to_append=[[o_id,c_name,",".join(map(str,itemss)),pay_method,del_area,del_charges,t_amt,o_date]]
            request_ = sheet.values().append(spreadsheetId=SAMPLE_SPREADSHEET_ID, range="Website_Orders!A1:H1", valueInputOption="USER_ENTERED", insertDataOption="INSERT_ROWS",body={"values":item_to_append})
            request_.execute()
            print(request_)
       

           
           



            orderslrz = OrderSuccessSerializer(order,many=False)
            return Response(orderslrz.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Bad Request"},status=status.HTTP_404_NOT_FOUND)


# @api_view(['GET'])
# def updateSpreadsheet(request):
#     service = build('sheets','v4',credentials=creds)
#     sheet = service.spreadsheets()
#     result = sheet.values().get(spreadsheetId = SAMPLE_SPREADSHEET_ID,range="class!A1:C3").execute()
#     values = result.get('values',[])
#     aoa = [["Ansh","4","99"],["Richa","9","982"]]
#     request = sheet.values().append(spreadsheetId=SAMPLE_SPREADSHEET_ID, range="class!A1:C1", valueInputOption="USER_ENTERED", insertDataOption="INSERT_ROWS",body={"values":aoa})
#     request.execute()
#     print(request)

#     # print(values)
#     return HttpResponse("OK")

@api_view(['GET','PUT'])
def updateSpreadsheet(request):
    print(request.details)
    return HTTPResponse("OK")
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    order = Order.objects.get(order_id=pk)
    if order:
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(http_method_names=["POST"])
def payment_status(request):
    if request.data:
        order = Order.objects.get(order_id = request.data['order_id'])
        order.timestamp_updated_at = datetime.datetime.now()
        order.payment_status = request.data['payment_status']
        order.save()
        slzr_order = OrderSerializer(order,many=False)
        return Response(slzr_order.data,status=status.HTTP_200_OK)
    else:
        return Response({"message":"Bad Request"},status=status.HTTP_400_BAD_REQUEST)

@api_view(http_method_names=["POST"])
def delivery_status(request):
    if request.data:
        order = Order.objects.get(order_id = request.data['order_id'])
        order.timestamp_updated_at = datetime.datetime.now()
        order.order_status = request.data['delivery_status']
        order.save()
        slzr_order = OrderSerializer(order,many=False)
        return Response(slzr_order.data,status=status.HTTP_200_OK)
    else:
        return Response({"message":"Bad Request"},status=status.HTTP_400_BAD_REQUEST)
