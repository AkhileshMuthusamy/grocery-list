
from test import BaseCase

class HomeTest(BaseCase):

    def test_home_route(self):
        '''
        Test flask index route
        '''
        response = self.app.get('/')

        self.assertEqual('API is up and listening!', response.data.decode('utf-8'))
        self.assertEqual(200, response.status_code)