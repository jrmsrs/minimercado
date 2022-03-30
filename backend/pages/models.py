from django.db import models

class Product(models.Model):

    name = models.CharField(max_length=50,unique=True,verbose_name="Nome")
    price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name="Preço")

    class Meta:
        verbose_name = "Produto"

    def __str__(self):
        return "{} (R${})".format(self.name,self.price)
    

class Sale(models.Model):

    qty = models.IntegerField(verbose_name="Quantidade")
    date = models.DateTimeField(auto_now=False, auto_now_add=True, verbose_name="Data")
    product_name = models.ForeignKey(Product, verbose_name="Produto", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Venda"

    def __str__(self):
        return f"{self.product_name} {self.qty}x @ {self.date.strftime('%d-%m-%Y | %H:%M')}"
