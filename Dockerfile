FROM python:3.12-alpine

RUN adduser -S app
RUN addgroup app && addgroup app app

WORKDIR /app

RUN apk add curl
RUN curl -sSL https://install.python-poetry.org | python3
ENV POETRY_VIRTUALENVS_CREATE=false

COPY poetry.lock pyproject.toml ./

RUN /root/.local/share/pypoetry/venv/bin/poetry install --all-extras --compile

COPY . .

CMD sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
