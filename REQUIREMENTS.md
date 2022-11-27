# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index:  '/products' - GET
- Show:    '/products/:id' - GET
- Create [token required]:  '/products' - POST

#### Users
- Index [token required]:   '/users' - GET
- Show [token required]:    '/users/:id' - GET
- Create N[token required]: '/users' - POST

#### Orders
- Current Order by user (args: user id)[token required]:    '/orders/user/:id' - GET


## Data Shapes
#### Product
-  id
- name
- price

Table: products (id: SERIAL PRIMARY KEY, name VARCHAR(164), price INTEGER)

#### User
- id
- firstName
- lastName
- password

Table: users (id: SERIAL PRIMARY KEY, firstName VARCHAR(100), lastName VARCHAR(100), password VARCHAR(100))

#### Orders
- id
- user_id
- status of order (active or complete)

Table: orders (id: SERIAL PRIMARY KEY,
            user_id: bigint REFERENCES users(id),
            status: VARCHAR(15))

#### Order-Products
- id  
- quantity 
- order_id 
- product_id 

Tbale order_products (id: SERIAL PRIMARY KEY,
                    quantity: integer,
                    order_id: bigint REFERENCES orders(id),
                    product_id: bigint REFERENCES products(id))
