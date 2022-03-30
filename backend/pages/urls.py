from django.urls import path
from .views import IndexView, CatalogoView, SobreView

urlpatterns = [
    path('', IndexView.as_view(), name='inicio'),
    path('catalogo', CatalogoView.as_view(), name='catalogo'),
    path('sobre', SobreView.as_view(), name='sobre'),
    
]
