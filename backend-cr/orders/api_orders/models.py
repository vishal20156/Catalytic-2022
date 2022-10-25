from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils import timezone

from datetime import timedelta





class Order(models.Model):
    status_choices = (
        (1, 'Not Packed'),
        (2, 'Ready For Shipment'),
        (3, 'Shipped'),
        (4, 'Delivered')
    )
    payment_status_choices = (
        (1, 'SUCCESS'),
        (2, 'FAILURE'),
        (3, 'PENDING'),
    )
    id = models.AutoField(primary_key=True)
    order_id = models.CharField(unique=True, max_length=100, null=True, blank=True, default=None)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.FloatField()
    cart = models.JSONField(default=None)
    payment_status = models.CharField(choices = payment_status_choices,max_length=100,default=3)
    order_status = models.CharField(choices = status_choices,max_length=100,default=1)
    timestamp_created_at = models.DateTimeField(auto_now_add=True)
    timestamp_updated_at = models.DateTimeField(auto_now=True)
    shippingAddress= models.JSONField(default=None)

    def save(self, *args, **kwargs):
        if self.order_id is None and self.timestamp_created_at:
            self.order_id = self.timestamp_created_at.strftime('PAY2ME%Y%m%dODR') + str(uuid.uuid4())[:4]
        return super().save(*args, **kwargs)


class extendedUser(models.Model):
    phone_no = models.CharField(max_length=15)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.phone_no
    
