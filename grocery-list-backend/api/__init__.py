import config
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_restful import Api
from module.encoder import MongoJsonEncoder

app = Flask(__name__) # Initialize Flask app
app.json_encoder = MongoJsonEncoder # Encoder to parse MongoDB BSON object into JSON
app.config["MONGO_URI"] = config.MONGO_URI
mongo = PyMongo(app) 
flask_api = Api(app)
CORS(app) # Allow request from different ports

# Imported endpoint resources here to prevent cyclic import
from api import home
from api.grocery_item import GroceryItem
from api.grocery_list import GroceryList, GroceryListByID

# Flask endpoints
flask_api.add_resource(GroceryList, '/grocery-list')
flask_api.add_resource(GroceryListByID, '/grocery-list/<string:_id>')
flask_api.add_resource(GroceryItem, '/grocery-item')
