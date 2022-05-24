import json

from test import BaseCase

class GroceryListTest(BaseCase):

    def test_fetch_all_grocery_list(self):
        '''
        Test get all grocery list
        '''
        # GIVEN post request to add new list
        payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # WHEN called get request
        response = self.app.get(f'/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(str, type(response.json['data'][0]['title']))
        self.assertEqual(list, type(response.json['data']))
        self.assertEqual(200, response.status_code)

    
    def test_fetch_grocery_list_by_id(self):
        '''
        Test get grocery list with valid _id
        '''
        # GIVEN post request to add new list
        payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)
        _id = response.json['data']['inserted_id']

        # WHEN called get request with existing _id
        response = self.app.get(f'/grocery-list/{_id}')

        # THEN
        self.assertEqual(str, type(response.json['data'][0]['title']))
        self.assertEqual(list, type(response.json['data']))
        self.assertEqual(200, response.status_code)



    def test_add_grocery_list(self):
        '''
        Test add new grocery list with valid data
        '''
        # GIVEN payload to create new grocery list
        payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })

        # WHEN called post request
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)


    def test_add_grocery_list_invalid_data(self):
        '''
        Test add new grocery list with invalid data
        '''

        # GIVEN payload with missing fields
        payload = json.dumps({
            "list_name": 'Testing',
        })

        # When
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['message']))
        self.assertEqual(400, response.status_code)

    
    def test_update_grocery_list(self):
        '''
        Test update grocery list with valid data
        '''
        # GIVEN payload of existing grocery list
        post_payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        # Creating a grocery list to perform update operation on it
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=post_payload)

        payload = json.dumps({
            "_id": response.json['data']['inserted_id'],
            "title": "Testing 0000",
            "color": "#TEST"
        })

        # WHEN called put request
        response = self.app.put('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)

    def test_update_grocery_list_invalid_data(self):
        '''
        Test update grocery list with invalid data
        '''
        # GIVEN payload with missing _id in grocery list
        payload = json.dumps({
            "_id": "",
            "title": "Testing 0000",
            "color": "#TEST"
        })

        # WHEN called put request
        response = self.app.put('/grocery-list', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['error']))
        self.assertEqual(400, response.status_code)



    def test_delete_grocery_list(self):
        '''
        Test delete grocery list with valid data
        '''
        # GIVEN payload of existing grocery list
        post_payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })

        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=post_payload)
        _id = response.json['data']['inserted_id']

        # WHEN called delete request
        response = self.app.delete(f"/grocery-list?_id={_id}")

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)



    def test_delete_grocery_list_invalid_data(self):
        '''
        Test delete grocery list with invalid data
        '''
        # GIVEN invalid id of the grocery list
        _id = ""

        # WHEN called delete request
        response = self.app.delete(f"/grocery-list?_id={_id}")

        # THEN
        self.assertEqual(dict, type(response.json['error']))
        self.assertEqual(400, response.status_code)

    