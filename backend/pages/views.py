from django.views.generic import TemplateView
from django.views.generic import ListView
from api.models import Product

# Create your views here.
class IndexView(TemplateView):
    template_name = "pages/index.html"

class CatalogoView(ListView):
    model = Product
    template_name = "pages/catalogo.html"

class SobreView(TemplateView):
    template_name = "pages/sobre.html"
