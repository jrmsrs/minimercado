# Tasks e anotações

Projeto será primariamente um site que lista, publicamente, o catalogo (como um encarte) de um minimercado, porém para os funcionários desse mercado, através de acesso restrito, controlará a venda dos caixas.


## Autorizações

Publico (+Funcionarios, +Admins):
- "comprar" (um link para um whatsapp empresarial ficticio)
- ler catálogo
- filtrar catálogo por sessões
- acesso função "logar"
- acessar urls:
  - /
  - /catalogo
  - /sobre 
  - /login 

Funcionario (+Admins)
- ler vendas
- add vendas
- acesso função "deslogar
- urls: 
  - /venda
  - /venda/add 
  - /logout

Admin -- principais funçoes 
- add/remove contas (registrar)
- adm grupos (quem é admin/funcionario)
- remove vendas 
- edit vendas
- add catalogo
- edit catalogo
- remove catalogo
- ler relatorio (consulta vendas_catalogo)
- urls: 
  - /catalogo/add 
  - /catalogo/id/upd 
  - /catalogo/id/rmv
  - /venda/id/upd
  - /venda/id/rmv
  - /registrar 


## Futuramente

- Tentar controlar estoques 


## Estrutura das tabelas

Criar tabelas no banco de dados (através de modelos) similar a:

```

/* ---- Cria tabelas ---- */

  /* Sessão */
  CREATE TABLE IF NOT EXISTS section(
    section_id int AUTO_INCREMENT PRIMARY KEY, 
    name text NOT NULL
  );

  /* Categoria */
  CREATE TABLE IF NOT EXISTS category(
    category_id int AUTO_INCREMENT PRIMARY KEY, 
    name text NOT NULL,
    fk_section_id int,
    FOREIGN KEY (fk_section_id) REFERENCES section(section_id)
  );

  /* Catálogo */
  CREATE TABLE IF NOT EXISTS product(
    prod_id int AUTO_INCREMENT PRIMARY KEY, 
    name text NOT NULL,
    price real NOT NULL
  );

  /* Venda */
  CREATE TABLE IF NOT EXISTS sale(
    sale_id int AUTO_INCREMENT PRIMARY KEY, 
    fk_sale_id int,
    qty int NOT NULL,
    date text NOT NULL,
    FOREIGN KEY (fk_prod_id) REFERENCES product(prod_id)
  );

/* ---- Consulta relatório ---- */

  /* Relatório */
  SELECT sale.date, sum(prod.price*sale.qtd) total
  FROM sale
  LEFT JOIN product prod 
  ON sale.fk_prod_id=prod.prod_id
  GROUP BY sale.data;

```