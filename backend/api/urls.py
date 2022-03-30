from django.urls import path
from .views import SectorView, CategoryView, ProductView, SaleView

urlpatterns = [
    path('sector', SectorView.as_view()),
    path('category', CategoryView.as_view()),
    path('product', ProductView.as_view()),
    path('sale', SaleView.as_view()),
]