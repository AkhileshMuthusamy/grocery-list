FROM python:3.8.13-bullseye

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

EXPOSE 5000

COPY . .

CMD [ "python", "app.py" ]