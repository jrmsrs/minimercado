from django.views.generic import TemplateView

# Create your views here.
class IndexView(TemplateView):
    template_name = "pages/index.html"

class CatalogoView(TemplateView):
    template_name = "pages/catalogo.html"

class SobreView(TemplateView):
    template_name = "pages/sobre.html"
