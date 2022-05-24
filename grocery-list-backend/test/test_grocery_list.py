import unittest
import json

from api import app
from api import mongo

import json

from test import BaseCase

class GroceryListTest(BaseCase):

    def test_add_grocery_list(self):

        # Given
        payload = json.dumps({
            "name": 'Walmart',
        })

        # When
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # Then
        self.assertEqual(dict, type(response.json['message']))
        self.assertEqual(200, response.status_code)

    def test_add_grocery_list_invalid_data(self):
        # Given
        payload = json.dumps({
            "list_name": 'Walmart',
        })

        # When
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # Then
        self.assertEqual(dict, type(response.json['message']))
        self.assertEqual(400, response.status_code)
