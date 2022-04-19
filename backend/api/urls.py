from django.urls import path
from .views import SectorView, SectorSingleView, CategoryView, CategorySingleView, ProductView, ProductSingleView, SaleView, SaleSingleView

urlpatterns = [
    path('sector', SectorView.as_view()),
    path('sector/<pk>', SectorSingleView.as_view()),
    path('category', CategoryView.as_view()),
    path('category/<pk>', CategorySingleView.as_view()),
    path('product', ProductView.as_view()),
    path('product/<pk>', ProductSingleView.as_view()),
    path('sale', SaleView.as_view()),
    path('sale/<pk>', SaleSingleView.as_view()),
]