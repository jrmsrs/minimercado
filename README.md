## Setup Python
1. instale o asdf (brew/yay/git/etc)
2. `asdf plugin-add python`
3. `asdf global system`
3. `asdf install $(grep python .tool-versions)`

## Install dependencies
`python -m pip install requirements.txt`

## Run Django server
`python manage.py runserver`

## Opcional: 
- `python manage.py createsuperuser`
- logar em http://localhost:8000/administrativum
