## Nodejs course homework

### Start application

1. Clone the repo.
2. Install project dependencies.
```
npm install
```
3. Put data to the database
```
node http-servers/add-data.js 
```
4. To check task 1 - 4
```
node http-servers/json-server.js
```
5. To check express servers run
```
npm start
```

Routes:

/api/users/:id DELETE Deletes ​SINGLE​ user

/api/products/:id DELETE Deletes ​SINGLE​ product

/api/cities GET Returns ​ALL​ cities

/api/cities POST Adds ​NEW​ city and returns it

/api/cities/:id PUT Updates ​SINGLE city by​ id if exists or adds NEW ​city with the given ​id​ otherwise

/api/cities/:id DELETE Deletes ​SINGLE​ city
