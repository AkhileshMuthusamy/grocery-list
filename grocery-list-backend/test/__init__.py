import unittest

from app import app
from api import mongo


class BaseCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.db = mongo.db


    def tearDown(self):
        # Delete Database documents after the test is complete
        response = mongo.db.groceryList.delete_many({'color': '#TEST'})
        print('RESPONSE DELETED COUNT:', response.deleted_count)