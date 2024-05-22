# Booklingo

Book e-commerce service for the sale and purchase of used books.

## Getting Started

**Pre-requisites**

- Node v20.11.0 (or latest)
- npm v10.2.4 (or latest)

**Instalation**

1. Clone the repo 

    ```
    git clone https://github.com/Sonya-c/booklingo.git
    ```

2. Install packages 
    ```
    npm install
    ```

3. Create an `.env` file. You can check the [example env](.env.example)
    ```
    PORT = # Optional default to 5000
    JWT_SECRET=
    JWT_ACCESS_EXPIRE=60 # This is on minutes
    MONGO_URI= 
    MONGO_DB= # Prod or Test
    ```

    You can create the `JWT_SECRET` using [createSecret.js](./scripts/createSecret.js) script.

    ```
    node .\scripts\createSecret.js
    ```

**Executing programm**

```
npm run start
```

Now you can use the api on the localhost!

## Mock data

The script [generateDatabase.js](./scripts/generateDatabase.js) creates random users and books and saves the data as a JSON on the data folder.
It also saves the plainPassword.

```
node .\scripts\generateDatabase.js
```

**This data is just for testing purposes so it's saved in the test db. Never in production**. 

This script use the [faker.js](https://github.com/faker-js/faker) library and a set of pre-defined genres. You can ajust the numbers of users and books to be created changing the `userNumber` and `bookNumber` variables (respectively).

## Endpoints 

You can import the [postman collection](Booklingo.postman_collection.json). 

### Authentication

-  `POST /auth/register` - :key: Create a new user.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | userData    | body (required)  | User data                 |

    UserData schema (example)

    ```JSON
    {
        "name": "Waldo",
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "raMGvnui"
    }
    ```

    **Response**

    | Code | Description                                     |     
    |------|-------------------------------------------------|
    | 201  | Created. Return an user object and anauthToken  |
    | 409  | Conflict: User with given email already exists |
    | 422  | Unprocessable Entity: missing values, too many values, wrong values |
    

    Example `201` response

    ```JSON
    {
        "user": {
            "name": "Waldo",
            "email": "TheOriginalWaldo@hotmail.com",
            "password": "$2b$10$MHYVRNe7Nki9CPz7MXCRbegQZfbHm09l5eIUanJYH3b1GU4ezVmCq",
            "isDeleted": false,
            "_id": "6641830665a4fb605dc28cec",
            "createdAt": "2024-05-13T03:03:34.985Z",
            "updatedAt": "2024-05-13T03:03:34.985Z",
            "__v": 0
        },
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQxODMwNjY1YTRmYjYwNWRjMjhjZWMiLCJpYXQiOjE3MTU1Njk0MTUsImV4cCI6MTcxNTU3MzAxNX0.ghO1kw-ckz7nYlLJaqQiv_uk_7o8He1uZh0GlOC_7g8"
    }
    ```

- `POST /auth/login` - :key: Login a user.

    **Parameters**

    | Name        | Type             | Description                |
    |-------------|------------------|----------------------------|
    | userData    | body (required)  | User data: email and password |

    UserData schema (example)

    ```JSON
    {
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "raMGvnui"
    }
    ```

    **Response**

    | Code | Description                    |     
    |------|--------------------------------|
    | 200  | Ok: User Object and auth Token |
    | 401   | Unauthorized: Wrong password             |
    | 404  | Not found: User dosen't exist         |
    | 422   | Unprocessable Entity: Missing values, bad format, extra values           |
    
    Example `200` response

    ```JSON
    {
        "user": {
            "_id": "66416be26ddf0ea93bf759c0",
            "name": "Waldo",
            "email": "TheOriginalWaldo@hotmail.com",
            "password": "$2b$10$PmNlTkdbJtuvo5hPErAOxupeYz7pefpeZGe8UlSas9nGZIMCm1gFC",
            "isDeleted": false,
            "createdAt": "2024-05-13T01:24:50.866Z",
            "updatedAt": "2024-05-13T01:24:50.866Z",
            "__v": 0
        },
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQxNmJlMjZkZGYwZWE5M2JmNzU5YzAiLCJpYXQiOjE3MTU1NjM1NjAsImV4cCI6MTcxNTU2NzE2MH0.onWE9-YZPGlTB6Gdq3_Dyhj9r9DyMYsPCHHAmx5U8PM"
    }
    ```

### Users

- `GET /user` - :unlock: Get all users. 

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | showDeleted | query (optional) | Boolean                   |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | List of User Objects    |
    

- `GET /user/:userId` - :unlock: Get one user by id.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | userId      | parm (required)  | User Id (mongo Id)        |
    | showDeleted | query (optional) | Show deleted entries too. |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | OK: User Object             |
    | 404  | Not found: User not found          | 
    | 422  | Unprocessable Entity: userId is not a mongo id object       |

    Example `200` response

    ```JSON
    {
        "_id": "66400b5d258f2e3132bcd837",
        "name": "Kelvin Leffler",
        "email": "Lukas_Stark23@yahoo.com",
        "password": "$2b$10$KNCmq.PCwx.J6ZhmjNX2yOZ5K7VSruCqHpdyaW514TEhmXYYxzkUK",
        "isDeleted": false,
        "createdAt": "2024-05-12T00:20:45.306Z",
        "updatedAt": "2024-05-12T00:20:45.306Z",
        "__v": 0
    }
    ```

- `PATCH /user/:userId` - :lock: Update one user by id (auth required).

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | header (required)  | Auth token                |
    

    **Response**

    | Code | Description               |     
    |------|---------------------------|
    | 200  | OK: User Object (before)  |
    | 404  | Not found: User not found (or user was deleted) | 
    | 401  | Unauthorized: No token was given or was expired |
    | 422  | Unprocessable Entity: Wrong format (email, password) or too many fields |

    Example `200` response

    ```JSON 
    {
        "_id": "66416be26ddf0ea93bf759c0",
        "name": "Waldo",
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "$2b$10$PmNlTkdbJtuvo5hPErAOxupeYz7pefpeZGe8UlSas9nGZIMCm1gFC",
        "isDeleted": false,
        "createdAt": "2024-05-13T01:24:50.866Z",
        "updatedAt": "2024-05-13T01:24:50.866Z",
        "__v": 0
    }
    ```  

- `DELETE /user/:userId` - :lock: Delete one user by id (auth required).

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | header (required)  | Auth token                |
    

    **Response**

    | Code | Description               |     
    |------|---------------------------|
    | 200  | OK: User Object               |
    | 404  | Not found: User not found (or it already deleted)           | 
    | 401  | Unauthorized: no token was given or was expired |

    Example `200` response

    ```JSON
    {
        "_id": "66416be26ddf0ea93bf759c0",
        "name": "Waldo the og",
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "$2b$10$PmNlTkdbJtuvo5hPErAOxupeYz7pefpeZGe8UlSas9nGZIMCm1gFC",
        "isDeleted": false,
        "createdAt": "2024-05-13T01:24:50.866Z",
        "updatedAt": "2024-05-13T01:28:35.473Z",
        "__v": 0
    }
    ```

### Books

- `GET /book` - :unlock: Get all books with optional filters.

    **Parameters**

    | Name         | Type              | Description               |
    |--------------|-------------------|---------------------------|
    | title        | Query (Optional)  | String                    |
    | genre        | Query (Optional)  | String                    |
    | startPubDate | Query (Optional)  | Date (string)             |
    | endPubDate   | Query (Optional)  | Date (string)             |
    | editorial    | Query (Optional)  | String                    |
    | author       | Query (Optional)  | String                    |
    | showDeleted  | Query (Optional)  | Boolean                   |
    | user         | query (Optional)  | Moongo Id of the owner    |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Ok: Book Object list        |
    | 422  | Unprocessable Entity: user id is not a mongo id |

    Example `200` response (genre = Graphic Novel)

    ```JSON
    [
        {
            "_id": "66417c240bdd97693c133590",
            "user": "66417c240bdd97693c133562",
            "title": "Viriliter somniculosus velociter adulescens asperiores deserunt peior audeo apud textus.",
            "author": "Lucia Spinka I",
            "editorial": "Mayert LLC",
            "genre": "Graphic Novel",
            "pubDate": "1651-02-21T18:14:48.550Z",
            "isDeleted": false,
            "createdAt": "2024-05-13T02:34:12.928Z",
            "updatedAt": "2024-05-13T02:34:12.928Z",
            "__v": 0
        },
        {
            "_id": "66417c240bdd97693c13359a",
            "user": "66417c230bdd97693c13355a",
            "title": "Cornu crudelis tamisium.",
            "author": "Mable Renner",
            "editorial": "Howell LLC",
            "genre": "Graphic Novel",
            "pubDate": "1658-06-28T15:10:51.354Z",
            "isDeleted": false,
            "createdAt": "2024-05-13T02:34:12.995Z",
            "updatedAt": "2024-05-13T02:34:12.995Z",
            "__v": 0
        },
        {
            "_id": "66417c250bdd97693c1335a4",
            "user": "66417c230bdd97693c13355a",
            "title": "Accusator celo audeo dignissimos vomica coerceo tardus temporibus.",
            "author": "Scott Farrell",
            "editorial": "Schaefer, Frami and Nitzsche",
            "genre": "Graphic Novel",
            "pubDate": "1616-05-14T06:25:44.107Z",
            "isDeleted": false,
            "createdAt": "2024-05-13T02:34:13.226Z",
            "updatedAt": "2024-05-13T02:34:13.226Z",
            "__v": 0
        }
    ]
    ```
    
- `GET /book/:bookId` - :unlock: Get one book by id.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | BookId      | parms (required) | Book Id (mongo Id)        |
    

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Ok: Book Object        |
    | 422  | Unprocessable Entity: Bad request data        |
    | 404  | Not Found: Book not found          |

    Example response

    ```JSON
    {
        "_id": "66417c240bdd97693c133590",
        "user": "66417c240bdd97693c133562",
        "title": "Viriliter somniculosus velociter adulescens asperiores deserunt peior audeo apud textus.",
        "author": "Lucia Spinka I",
        "editorial": "Mayert LLC",
        "genre": "Graphic Novel",
        "pubDate": "1651-02-21T18:14:48.550Z",
        "isDeleted": false,
        "createdAt": "2024-05-13T02:34:12.928Z",
        "updatedAt": "2024-05-13T02:34:12.928Z",
        "__v": 0
    }
    ```

- `POST /book/` - :lock: Create a book (auth required).

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | headers (required) | AuthToken                 |
    | bookData       | body (required)    | Book Data                 |

    Book Data schema (example)

    ```JSON
    {
        "user": "66400b5d258f2e3132bcd837",
        "title": "Tractatus logico-philosophicus",
        "author": "Ludwig Wittgenstein",
        "editorial": "Trantow - Bernhard",
        "genre": "Graphic Novel",
        "pubDate": "1611-03-14T16:43:46.191Z",
    }
    ```

    **Response**

    | Code | Description               |     
    |------|---------------------------|
    | 201  | Created: Book Object               |
    | 401  | Unauthorized: no token was given or was expired   |
    | 404  | Not Found: User not found            | 
    | 422  | Unprocessable Entity: Bad request data          |

    Example `201` Response

    ```JSON
    {
        "user": {
            "_id": "6641835965a4fb605dc28cf6",
            "name": "Waldo",
            "email": "TheOriginalWaldo@hotmail.com",
            "password": "$2b$10$zZddId0o5WnfDj7fZYam..kw1aBRwT7Y48jm8oqsv6r9Hpnc4WZMi",
            "isDeleted": false,
            "createdAt": "2024-05-13T03:04:57.008Z",
            "updatedAt": "2024-05-13T03:04:57.008Z",
            "__v": 0
        },
        "title": "Tractatus logico-philosophicus",
        "author": "Ludwig Wittgenstein",
        "editorial": "Trantow - Bernhard",
        "genre": "Graphic Novel",
        "pubDate": "1611-03-14T16:43:46.191Z",
        "isDeleted": false,
        "_id": "6641838d9ccc0805a2879735",
        "createdAt": "2024-05-13T03:05:49.505Z",
        "updatedAt": "2024-05-13T03:05:49.505Z",
        "__v": 0
    }
    ```
    
- `PATCH /book/:bookId` - :lock: Update one book by id (auth required).

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | headers (required) | AuthToken                 |
    | bookId         | parms (required)   | Book id                   | 
    | bookData       | body (required)    | Book Data (partial)       |

    Example 

    ```JSON
    {
        "genre": "Philosophy"
    }
    ```

    **Response**

    | Code | Description               |     
    |------|---------------------------|
    | 200  | Ok: Book Object               |
    | 422  | Unprocessable Entity: Bad request data          |
    | 404  | Not Found: User not found            | 
    | 404  | Not Found: Book not found            | 
    | 401  | Unauthorized: no token or expired   |
    | 403  | Forbiden: wrong permissions |

    Example `200` response 

    ```JSON
    {
        "_id": "6641838d9ccc0805a2879735",
        "user": "6641835965a4fb605dc28cf6",
        "title": "Tractatus logico-philosophicus",
        "author": "Ludwig Wittgenstein",
        "editorial": "Trantow - Bernhard",
        "genre": "Graphic Novel",
        "pubDate": "1611-03-14T16:43:46.191Z",
        "isDeleted": false,
        "createdAt": "2024-05-13T03:05:49.505Z",
        "updatedAt": "2024-05-13T03:05:49.505Z",
        "__v": 0
    }
    ```

- `DELETE /book/:bookId` - :lock: Delete one book by id (auth required).

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | headers (required) | AuthToken                 |
    | bookId         | parms (required)   | Book id                   | 

    **Response**

    | Code | Description               |      
    |------|---------------------------|
    | 200  | Ok: Book Object               |
    | 422  | Unprocessable Entity: Bad request data          |
    | 404  | Not found: User not found            | 
    | 404  | Not found: Book not found            | 
    | 401  | Unauthorized: no token or expired   |
    | 403  | Forbiden: 403 Forbidden |

    Example `200` response 

    ```JSON 
    {
        "_id": "6641838d9ccc0805a2879735",
        "user": "6641835965a4fb605dc28cf6",
        "title": "Tractatus logico-philosophicus",
        "author": "Ludwig Wittgenstein",
        "editorial": "Trantow - Bernhard",
        "genre": "Philosophy",
        "pubDate": "1611-03-14T16:43:46.191Z",
        "isDeleted": false,
        "createdAt": "2024-05-13T03:05:49.505Z",
        "updatedAt": "2024-05-13T03:09:09.693Z",
        "__v": 0
    }
    ```

### Orders

- `GET /order` - :lock: Get all orders with optional filters. 
    
    <!-- debe poderse filtrar por fecha de creación (entre una y otra fecha), y por estado del pedido (en progreso, completado, cancelado -->
    **Parameters**

    | Name          | Type              | Description               |
    |---------------|-------------------|---------------------------|
    | authToken     | header (required) |                           | 
    | orderStatus   | query (optional)  | 'IN PROGRESS', 'COMPLETED' or 'CANCELLED' |
    | startPubDate  | query (optional)  ||
    | endPubDate    | query (optional)  ||
    | userRol       | qyery (optional)  | 'orderCreator' or 'orderReceiver' |

    **Response**

    | Code | Description               |     
    |------|---------------------------|
    | 200  | Ok: Order Object              |
    | 422  | Unprocessable Entity | 
    | 404  | Not found: user not found | 
    | 401  | Unauthorized: no token or expire   |


- `GET /order/:orderId` - :lock: Get one order by id.

     **Parameters**

    | Name        | Type              | Description               |
    |-------------|-------------------|---------------------------|
    | orderId     | params (required) |                           | 
    | authToken   | header (required) |                           | 

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Ok: Order Object            |
    | 404  | Not Found: Order not found         | 
    | 404  | Not Found: User not found         | 
    | 401  | Unauthorized: no token or expired   |
    | 403  | Forbiden: you are neither order creator nor order reciver |
    | 422  | Unprocessable Entity: Order id is not an id |

    Example `200` reponse 

    ```JSON
    {
        "_id": "664188139ccc0805a2879758",
        "orderCreator": "6641835965a4fb605dc28cf6",
        "orderReceiver": "664181a28799402bcab6039c",
        "status": "IN PROGRESS",
        "books": [
            "664181a38799402bcab603c8",
            "664181a38799402bcab603cc",
            "664181a38799402bcab603e8"
        ],
        "createdAt": "2024-05-13T03:25:07.063Z",
        "updatedAt": "2024-05-13T03:25:07.063Z",
        "__v": 0
    }
    ```

- `POST /order` - :lock: Create a order.
    
    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | headers (required) | AuthToken                 |
    | bookList       | body (required)    | List of Book Id           |

    Note: all books should have the same owner. Otherwise, a `422` will happen.

    Example request 

    ```JSON 
    {
        "books": [
            "664181a38799402bcab603c8",
            "664181a38799402bcab603cc",
            "664181a38799402bcab603e8"
        ]
    }
    ```

    **Response**

    | Code | Description                    |     
    |------|--------------------------------|
    | 201  | Create: Order Object                   |
    | 422  | Unprocessable Entity: Bad request data (All id should be books ids and from the same owner) |
    | 404  | Not found: User (orderCreator) not found  | 
    | 404  | Not found: User (orderReceiver) not found | 
    | 404  | Not found: Book not found                 | 
    | 401  | Unauthorized: no token or expire        |


    Example `201` response 

    ```JSON
    {
        "orderCreator": {
            "_id": "6641835965a4fb605dc28cf6",
            "name": "Waldo",
            "email": "TheOriginalWaldo@hotmail.com",
            "password": "$2b$10$zZddId0o5WnfDj7fZYam..kw1aBRwT7Y48jm8oqsv6r9Hpnc4WZMi",
            "isDeleted": false,
            "createdAt": "2024-05-13T03:04:57.008Z",
            "updatedAt": "2024-05-13T03:04:57.008Z",
            "__v": 0
        },
        "orderReceiver": {
            "_id": "664181a28799402bcab6039c",
            "name": "Sonya Crooks V",
            "email": "Shanel.Boehm18@hotmail.com",
            "password": "$2b$10$APw4h5Y6SlGla2mXSnGMDesDFy8FA0R1Hwnn4Y2yuhgaV9kqKJgOy",
            "isDeleted": false,
            "createdAt": "2024-05-13T02:57:38.013Z",
            "updatedAt": "2024-05-13T02:57:38.013Z",
            "__v": 0
        },
        "status": "IN PROGRESS",
        "books": [
            {
                "_id": "664181a38799402bcab603c8",
                "user": "664181a28799402bcab6039c",
                "title": "Tabgo aestivus omnis aestivus avarus cavus vinum texo cumque contabesco.",
                "author": "Bryant Bahringer",
                "editorial": "Batz - Sporer",
                "genre": "Fantasy",
                "pubDate": "1553-12-04T01:26:14.375Z",
                "isDeleted": false,
                "createdAt": "2024-05-13T02:57:39.218Z",
                "updatedAt": "2024-05-13T02:57:39.218Z",
                "__v": 0
            },
            {
                "_id": "664181a38799402bcab603cc",
                "user": "664181a28799402bcab6039c",
                "title": "Suffragium censura talis tabula tempus vociferor.",
                "author": "Nick Schamberger",
                "editorial": "Tillman, Flatley and Glover",
                "genre": "Thriller",
                "pubDate": "1541-12-26T07:36:32.790Z",
                "isDeleted": false,
                "createdAt": "2024-05-13T02:57:39.226Z",
                "updatedAt": "2024-05-13T02:57:39.226Z",
                "__v": 0
            },
            {
                "_id": "664181a38799402bcab603e8",
                "user": "664181a28799402bcab6039c",
                "title": "Tondeo adversus delicate campana depereo audio magnam virtus.",
                "author": "Tonya Toy",
                "editorial": "Corkery Group",
                "genre": "Graphic Novel",
                "pubDate": "1645-11-27T06:03:13.551Z",
                "isDeleted": false,
                "createdAt": "2024-05-13T02:57:39.589Z",
                "updatedAt": "2024-05-13T02:57:39.589Z",
                "__v": 0
            }
        ],
        "_id": "664188139ccc0805a2879758",
        "createdAt": "2024-05-13T03:25:07.063Z",
        "updatedAt": "2024-05-13T03:25:07.063Z",
        "__v": 0
    }
    ```


- `PATCH /order/:orderId` - :lock: Update an order status.

    **Parameters**

    | Name           | Type               | Description               |
    |----------------|--------------------|---------------------------|
    | authToken      | headers (required) | AuthToken                 |
    | orderId          | parms (required)   | Order Id                   |
    | status         | body (required)    | "CANCELED" or "COMPLETED". The user creator only can cancel an order. The user reciver can both canceled and mark as complete an order. |
    
    **Response**

    | Code | Description                    |     
    |------|--------------------------------|
    | 200  | OK: Order Object                   |
    | 404  | Not found: User not found                 | 
    | 404  | Not found: Book not found (ex. Book was deleted or sold )                 | 
    | 401  | Unauthorized: no token or expired        |
    | 403  | Forbiden: nor creator nor reciver, or wrong permmision |
    | 422  | Unprocessable Entity: order Id is not a id ot status is missing or wrong. Or order is already cancelled or completed. |


## Constraints

- **Book data**: To make it simple, a book can only have one auth and one genere.
- **Auth requirement**: All endpoint requried auth (but create user and read books).
- **Delete**: All deletes are *soft delete* and read operations should not return deleted entrys (**unsless is required**).
- **Oder Status**: When updating a order, only the state can be change
    - The user that create the orden can cancel it.
    - The user that recived the orden can complete it and cancel it.
- **Orders and book**: A order can have more that one book (all with the same owner).

## Roadmap

- [x] Auth 
    - [x] Login.
    - [x] Register.

- [x] User endpoint.
    - [x] Create an user.
    - [x] Get all users.
    - [x] Get a user by id.
    - [x] Update an user.
    - [x] Delete an user.

- [x] Books endpoints.
    - [x] Create an user.
    - [x] Get all books (+ optional filters) 
    - [x] Get a book by id.
    - [x] Update a book by id.
    - [x] Delete a book by id.

- [ ] Orders.
    - [x] Create an order.
    - [x] Update an order (stauts, check auth).
    - [-] Get all order (filter by status, creation date).
    - [x] Get order by id.

- Extras.

    - [X] Get books of one user.
    - [x] Extra query: show deleted items.
    - [x] When getting orders, should auth be required?
    - [x] When getting an order by id, should auth be required?
    - [ ] Loggers.
    - [ ] string sanitization?
    - [ ] Docker.

## Authors

<a href="https://github.com/sonya-c/booklingo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sonya-c/booklingo" />
</a>