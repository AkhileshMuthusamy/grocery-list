import config

from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_pymongo import PyMongo
from module.encoder import MongoJsonEncoder

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.json_encoder = MongoJsonEncoder
app.config["MONGO_URI"] = config.MONGO_URI
mongo = PyMongo(app)
flask_api = Api(app)
CORS(app)

from api import home
from api.grocery_list import GroceryList
from api.grocery_item import GroceryItem


flask_api.add_resource(GroceryList, '/grocery-list')
flask_api.add_resource(GroceryItem, '/grocery-item')