FROM python:3.8.13-bullseye

# Set the working directory
WORKDIR /usr/src/app

COPY requirements.txt ./

# Install the dependencies
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

# Copy source code to container
COPY . .

CMD [ "gunicorn", "app:app" ]