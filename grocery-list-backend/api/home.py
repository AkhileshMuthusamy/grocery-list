from api import app

@app.route('/')
def home():
    return 'API is up and listening!'