import unittest

from app import app
from api import mongo


class BaseCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.db = mongo.db


    def tearDown(self):
        # Delete Database collections after the test is complete
        print('REACHED HERE', self.db)
        # for collection in self.db.list_collection_names():
            # self.db.drop_collection(collection)