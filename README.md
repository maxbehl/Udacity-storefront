# Storefront Backend Project

This is the Udacity Storefront Backend Project. 

# To get started

1. Set up the database with the following commands on psql postgres:

- ```CREATE USER shopping_user WITH PASSWORD 'password123';```
- ```CREATE DATABASE shopping;```
- ```CREATE DATABASE shopping_test;```
- ```GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;```
- ```GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;```

2. Add an .env file with the following properties:

 - POSTGRES_HOST=127.0.0.1
 - POSTGRES_DB=shopping
 - POSTGRES_TEST_DB=shopping_test
 - POSTGRES_USER=shopping_user
 - POSTGRES_PASSWORD=password123
 - ENV=test
 - BCRYPT_PASSWORD=my-super-password
 - SALT_ROUNDS=10
 - TOKEN_SECRET=my-token-secret


# Install dependencies
- ```npm install yarn -g```
- ```npm install db-migrate -g```
- Check Node version ```nove -v``` - it needs 12 level
- IF node is not 12 level:
    - ```npm install -g n```
    - ```n 12.22.0```
    - ```PATH="$PATH"```
    - ```node v ```--> to check version
- Install all project dependencies with ```yarn```

# Script to run and test project functionality

- ```yarn test``` for testing
- ```yarn watch``` to build and run

### Migrate Up Databases
Install the db-migrate library globally on your system to run the command.
npm would otherwise include the binaries and packages in the ```node_modules``` directory

Dev
```db-migrate up --config database.json -e dev```

Test
```db-migrate up --config database.json -e test```

### Migrate Down Databases
Dev
```db-migrate down --config database.json -e dev```

Test
```db-migrate down --config database.json -e test```

# PORT SERVER
- The server is running on: localhost:3000//
- The Postgres database is running on the default port 5432