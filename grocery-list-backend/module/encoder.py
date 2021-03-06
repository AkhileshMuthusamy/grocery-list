from bson import json_util, ObjectId
from flask.json import JSONEncoder
from datetime import datetime

# class MongoJsonEncoder(JSONEncoder):
#     def default(self, obj): 
#         return json_util.default(obj)

class MongoJsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        if isinstance(obj, ObjectId):
            return str(obj)
        return json_util.default(obj, json_util.CANONICAL_JSON_OPTIONS)