
from datetime import datetime

from flask import jsonify, make_response
from flask_restful import Resource, reqparse
from bson.objectid import ObjectId

from api import mongo

# Parse request fields as python dictionary
post_grocery_list_parser = reqparse.RequestParser()
post_grocery_list_parser.add_argument('name', required=True, type=str, help="Field required")

put_grocery_list_parser = reqparse.RequestParser()
put_grocery_list_parser.add_argument('_id', required=True, type=str, help="Field required")
put_grocery_list_parser.add_argument('name', required=True, type=str, help="Field required")

delete_grocery_list_parser = reqparse.RequestParser()
delete_grocery_list_parser.add_argument('_id', required=True, type=str, help="Field required", location='args')

class GroceryList(Resource):
    """
    """

    def get(self):
        """ GET request to fetch grocery list
        """

        try:
            records = mongo.db.groceryList.find({})
            return make_response(jsonify({
                'data': list(records)
            }), 200)

        except Exception as e:
            return make_response(jsonify({
                'error': {
                    'message': str(e), 
                }
            }), 400)


    def post(self):
        """ POST request to create new grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = post_grocery_list_parser.parse_args()

        try:
            if args['name']:
                response = mongo.db.groceryList.insert_one({
                    'name': args['name'],
                    'last_updated': datetime.now().utcnow()
                })
                return make_response(jsonify({
                    'data': {
                        'inserted_id': response.inserted_id, 
                        'acknowledged': response.acknowledged
                    }
                }), 200)
            else:
                return make_response(jsonify({
                    'error': {
                        'message': 'Invalid data', 
                    }
                }), 400)

        except Exception as e:
            return make_response(jsonify({
                'error': {
                    'message': str(e), 
                }
            }), 400)


    def put(self):
        """ PUT request to update grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = put_grocery_list_parser.parse_args()

        try:
            if args['_id'] and args['name']:
                response = mongo.db.groceryList.update_one(
                    {'_id': ObjectId(args['_id'])},
                    {'$set': {'name': args['name'], 'last_updated': datetime.now().utcnow()}}
                )
                return make_response(jsonify({
                    'data': {
                        'matched_count': response.matched_count, 
                        'modified_count': response.matched_count, 
                        'acknowledged': response.acknowledged
                    }
                }), 200)
            else:
                return make_response(jsonify({
                    'error': {
                        'message': 'Invalid data', 
                    }
                }), 400)

        except Exception as e:
            return make_response(jsonify({
                'error': {
                    'message': str(e), 
                }
            }), 500)

    def delete(self):
        """ DELETE request to remove grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = delete_grocery_list_parser.parse_args()

        try:
            if args['_id']:
                response = mongo.db.groceryList.delete_one(
                    {'_id': ObjectId(args['_id'])}
                )
                return make_response(jsonify({
                    'data': {
                        'deleted_count': response.deleted_count, 
                        'acknowledged': response.acknowledged
                    }
                }), 200)
            else:
                return make_response(jsonify({
                    'error': {
                        'message': 'Invalid data', 
                    }
                }), 400)

        except Exception as e:
            return make_response(jsonify({
                'error': {
                    'message': str(e), 
                }
            }), 500)
