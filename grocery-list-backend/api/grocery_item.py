from datetime import datetime

from flask import jsonify, make_response
from flask_restful import Resource, reqparse
from bson.objectid import ObjectId

from api import mongo

# Parse request fields as python dictionary
post_grocery_item_parser = reqparse.RequestParser()
post_grocery_item_parser.add_argument('_id', required=True, type=str, help="Field required")
post_grocery_item_parser.add_argument('name', required=True, type=str, help="Field required")

put_grocery_item_parser = reqparse.RequestParser()
put_grocery_item_parser.add_argument('_id', required=True, type=str, help="Field required") # Grocery List id
put_grocery_item_parser.add_argument('id', required=True, type=str, help="Field required") # Grocery Item id
put_grocery_item_parser.add_argument('name', required=True, type=str, help="Field required")
put_grocery_item_parser.add_argument('purchased', required=True, type=bool, help="Field required")

delete_grocery_item_parser = reqparse.RequestParser()
delete_grocery_item_parser.add_argument('_id', required=True, type=str, help="Field required") # Grocery List id
delete_grocery_item_parser.add_argument('id', required=True, type=str, help="Field required") # Grocery Item id

class GroceryItem(Resource):
    """ Endpoint to CREATE UPDATE READ DELETE grocery item
    """

    def post(self):
        """ POST request to add item to grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = post_grocery_item_parser.parse_args()

        try:
            if args['_id'] and args['name']:
                response = mongo.db.groceryList.update_one(
                    {'_id': ObjectId(args['_id'])},
                    {
                        '$push': {
                            'items': {
                                'id': ObjectId(),
                                'name': args['name'],
                                'purchased': False
                            }
                        },
                        '$set': {
                            'last_updated': datetime.now().utcnow()
                        }
                    }
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
            }), 400)

    def put(self):
        """ PUT request to update item in grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = put_grocery_item_parser.parse_args()

        try:
            if args['_id'] and args['id'] and args['name'] and args['purchased']:
                response = mongo.db.groceryList.update_one(
                    {'_id': ObjectId(args['_id']), 'items.id': ObjectId(args['id'])},
                    {
                        '$set': {
                            'items.$.name': args['name'],
                            'items.$.purchased': args['purchased'],
                            'last_updated': datetime.now().utcnow()
                        }
                    }
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
            }), 400)


    def delete(self):
        """ DELETE request to update item in grocery list
        """

        # Fetches request fields or returns HTTP 400 error
        args = delete_grocery_item_parser.parse_args()

        try:
            if args['_id'] and args['id']:
                response = mongo.db.groceryList.update_one(
                    {'_id': ObjectId(args['_id'])},
                    {
                        '$pull': {
                            'items': {
                                'id': ObjectId(args['id'])
                            }
                        }
                    }
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
            }), 400)

