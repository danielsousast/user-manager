# User Manager

The User Manager is an API made with Node, Express and MongoDB.

## Installation

```
  // 1 - Git Clone
  git clone https://github.com/danielsousast/user-manager.git

  // 2 - Change directory
  cd user-manager

  // 3 - Copy the .env.example and set the environment variables
  cp .env.example .env

  // 4 - Run the services (Be sure to have docker and docker-compose installed)
  docker-compose up -d

  // 5 - Once the services are running, its time to install the dependencies
  yarn or npm install

```

## Routes


| METHOD       | RESOURCE      | FUNCTION                                            |
| ------------ | --------------|-----------------------------------------------------|
|  POST        |  /users       | Creates a new user in the database                  |
|  POST        |  /sessions    | Generates a JWT authentication token                |
|  PUT         |  /users/:id   | Updates a user according to the parameter sent **(Private)**|
|  DELETE      |  /users/:id   | Changes a user's property DELETED to TRUE **(Private)**|
|  GET         |  /users       | Returns all users registered in the database **(Private)**|
|  GET         |  /users/:id   | Returns a user based on the id passed as a parameter **(Private)**|

The user must be logged in to access **Private** routes. Must have a JWT Token

### Requirements for each route
| METHOD       | RESOURCE      | FUNCTION                                            |
| ------------ | --------------|-----------------------------------------------------|
|  POST        |  /users       | body = name, username, email, password              |
|  POST        |  /sessions    | body = email, password                              |
|  PUT         |  /users/:id   | params = User Id   /   body(optional) = name, username, email, password |
|  DELETE      |  /users/:id   | params = User Id                                     |
|  GET         |  /users       | - - - |
|  GET         |  /users/:id   | params = User Id |

Private routes need the **JWT Token** that must be sent to the Header for the required word **'Bearer'**

## Status Code

| Status Codes | Description            |
| ------------ | ---------------------- |
|  200         |  OK                    |
|  400         |  BAD REQUEST           |
|  401         |  UNAUTHORIZED.         |
|  404         |  NOT FOUND             |
|  500         |  INTERNAL SERVER ERROR |

## Main Technologies
* Node
* Express
* Mongoose
* MongoDB

## Support Technologies
* Sentry
* Jest
* Docker
* Docker Compose

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

By Daniel Sousa - [See my LinkedIn!](https://www.linkedin.com/in/danielsousast/)
