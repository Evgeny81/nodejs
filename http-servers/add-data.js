const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb://localhost:27017/', {useNewUrlParser: true});

mongoClient.connect(function (err, client) {
    if (err) {
        return console.log(err);
    }
    const db = client.db('hw7');
    const citiesCollection = db.collection('cities');
    const productsCollection = db.collection('products');
    const usersCollection = db.collection('users');
    const cities = [
        {
            name: 'Brest',
            country: 'Belarus',
            capital: false,
            location: {lat: 52, long: 23}
        },
        {
            name: 'Moscow',
            country: 'Russia',
            capital: true,
            location: {lat: 52, long: 23}
        },
        {
            name: 'London',
            country: 'UK',
            capital: true,
            location: {lat: 52, long: 23}
        }
    ];
    const users = [
        {
            login: 'login',
            username: 'user name',
            password: 'password',
            email: 'email@epam.com'
        },
        {
            login: 'log',
            username: 'user',
            password: 'password',
            email: 'at@ag.com'
        }
    ];
    const products = [
        {
            title: 'tv',
            description: 'description',
            rate: 4,
            price: 100
        },
        {
            title: 'notebook',
            description: 'notebook description',
            rate: '3',
            price: 1500
        },
    ];
    citiesCollection.insertMany(cities, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });
    productsCollection.insertMany(products, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });
    usersCollection.insertMany(users, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });
});
