from django.contrib import admin

# Register your models here.

# app_name.models
from api.models import Sector, Category, Product, Sale

# Register your models to admin site, then you can add, edit, delete and search your models in Django admin site.

admin.site.register(Sector)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Sale)