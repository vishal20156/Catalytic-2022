
from django.contrib import admin

from .models import Order, extendedUser

from django.contrib.auth.models import User

# Register your models here.
admin.site.register(Order)
admin.site.register(extendedUser)
