# Mini Project (Full Stack): Grocery List

The application contains feature to fetch, add, edit and delete grocery list and individual grocery items. The user can mark the item as purchased. Additionally the user can change color for the grocery list. Since the application is for one family the User Authentication was not included.

| Stack | Tech |
|---|---|
| Fronted  |  Angular 13  |
| Backend |    Python - Flask   |
| Database | MongoDB |

## Cloud Deployment

* Frontend: Netlify (<https://rideco-grocery.netlify.app/>)
* Backend: Heroku (<https://rideco-grocery-list.herokuapp.com/>)
* Database: MongoDB Atlas`

## Local setup using Docker

* Download the pre-configured code from [release section](https://github.com/AkhileshMuthusamy/grocery-list/releases/download/Zip/Take_home_task_Akhilesh_Muthusamy.zip). (You may also clone this repository but it requires you to fill in the username and password for the database in `.env` file).
* Run `docker-compose up`
* Go to <http://localhost> to access the webpage.

> **Note:** The docker container requires port 80, 5000, 27017 to be free on your PC

## Run Unit Test

Frontend: Karma + Jasmine

```sh
ng test
```

Backend: PyTest

```sh
pytest -v
```

## Possible improvement

* Include `User Authentication` to support more families.
* Improve UI experience by providing the ability to reorder the grocery items in the list.
* Could add feature to uncheck the purchased box periodically (every 5 or 7 days) and send a reminder notification for reoccurring purchase.
* One way to scale the application is by converting each endpoint into microservice and deploy in it AWS/GCP which supports auto scaling.
