import json

from test import BaseCase

class GroceryItemTest(BaseCase):


    def test_add_item_to_grocery_list(self):
        '''
        Test add item with valid data
        '''
        # GIVEN payload to add new item and existing grocery list
        post_payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        # Creating a grocery list to add item into it
        response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=post_payload)
        _id = response.json['data']['inserted_id']

        payload = json.dumps({
            "_id": _id,
            "name": "New Item"
        })

        # WHEN called post request
        response = self.app.post('/grocery-item', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)


    def test_add_item_to_grocery_list_invalid_data(self):
        '''
        Test add item with invalid data
        '''

        # GIVEN payload to add new item with invalid data
        payload = json.dumps({
            "_id": '',
            "name": "New Item"
        })

        # WHEN called post request
        response = self.app.post('/grocery-item', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['error']))
        self.assertEqual(400, response.status_code)

    
    def test_update_grocery_item(self):
        '''
        Test update grocery item with valid data
        '''
        # GIVEN payload of existing grocery item and _id of its grocery list
        post_payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        # Creating a new grocery list
        list_response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=post_payload)

        _id = list_response.json['data']['inserted_id']
        item_payload = json.dumps({
            "_id": _id,
            "name": "New Item"
        })
        # Adding item into the above created list to perform update operation later
        self.app.post('/grocery-item', headers={"Content-Type": "application/json"}, data=item_payload)
        list_response = self.app.get(f'/grocery-list/{_id}')

        payload = json.dumps({
            "_id": _id,
            "id": list_response.json['data'][0]['items'][0]['id'],
            "name": "Updated Item",
            "purchased": False
        })

        # WHEN called put request
        response = self.app.put('/grocery-item', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)



    def test_update_grocery_item_invalid_data(self):
        '''
        Test update grocery item with invalid data
        '''
        # GIVEN payload with missing _id in grocery list
        payload = json.dumps({
            "_id": "",
            "id": "",
            "name": "Updated Item",
            "purchased": False
        })

        # WHEN called put request
        response = self.app.put('/grocery-item', headers={"Content-Type": "application/json"}, data=payload)

        # THEN
        self.assertEqual(dict, type(response.json['error']))
        self.assertEqual(400, response.status_code)



    def test_delete_grocery_list(self):
        '''
        Test delete grocery list with valid data
        '''
        # GIVEN payload of existing grocery item id and _id of its grocery list
        post_payload = json.dumps({
            "title": 'Testing',
            "color": "#TEST"
        })
        # Creating a new grocery list
        list_response = self.app.post('/grocery-list', headers={"Content-Type": "application/json"}, data=post_payload)

        _id = list_response.json['data']['inserted_id']
        item_payload = json.dumps({
            "_id": _id,
            "name": "New Item"
        })
        # Adding item into the above created list to perform update operation later
        self.app.post('/grocery-item', headers={"Content-Type": "application/json"}, data=item_payload)
        list_response = self.app.get(f'/grocery-list/{_id}')
        id = list_response.json['data'][0]['items'][0]['id']

        # WHEN called delete request
        response = self.app.delete(f"/grocery-item?_id={_id}&id={id}")

        # THEN
        self.assertEqual(dict, type(response.json['data']))
        self.assertEqual(200, response.status_code)



    def test_delete_grocery_list_invalid_data(self):
        '''
        Test delete grocery list with invalid data
        '''
        # GIVEN invalid _id of the grocery list and grocery item
        _id = ""
        id = ""

        # WHEN called delete request
        response = self.app.delete(f"/grocery-item?_id={_id}&id={id}")

        # THEN
        self.assertEqual(dict, type(response.json['error']))
        self.assertEqual(400, response.status_code)

    