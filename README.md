## Setup Python
1. instale o asdf (brew/yay/git/etc)
    1. `asdf plugin-add python`
    2. `asdf global system`
    3. `asdf install $(grep python .tool-versions)`
2. instale o pipenv
    1. `pip install --user pipenv`

## Install dependencies and activate virtual environment
```
git clone https://github.com/jrmsrs/minimercado.git && cd minimercado
cd backend
pipenv install
pipenv shell
```

## Setup Dotenv file
1. `cat .env.template > .env`
2. [gere uma Secret Key](https://djecrety.ir/)
3. coloque a secret key na var SC_KEY no arquivo .env criado

## Run Django server
```
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```  

## Opcional: 
- `python manage.py createsuperuser`
   - logar em http://localhost:8000/administrativum/
- o projeto frontend [(setup)](frontend/README.md) já está buildado em backend/build
