from django.db import models

class Sector(models.Model):
    name = models.CharField(max_length=50,unique=True,verbose_name="Nome")
    
    class Meta:
        verbose_name = "Setor"
        verbose_name_plural = "Setores"

    def __str__(self):
        return self.name

class Category(models.Model):
    sector = models.ForeignKey(Sector, verbose_name="Setor", on_delete=models.CASCADE)
    name = models.CharField(max_length=50,unique=True,verbose_name="Nome")

    class Meta:
        verbose_name = "Categoria"

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, verbose_name="Categoria", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50,unique=True,verbose_name="Nome")
    price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name="Preço")

    class Meta:
        verbose_name = "Produto"

    def __str__(self):
        return "{} (R${})".format(self.name,self.price)
    

class Sale(models.Model):
    product = models.ForeignKey(Product, verbose_name="Produto", on_delete=models.CASCADE)
    qty = models.IntegerField(verbose_name="Quantidade")
    date = models.DateTimeField(auto_now=False, auto_now_add=True, verbose_name="Data")

    class Meta:
        verbose_name = "Venda"

    def __str__(self):
        return f"{self.product} {self.qty}x @ {self.date.strftime('%d-%m-%Y | %H:%M')}"
