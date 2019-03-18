const mongoose = require('mongoose');
const {Users} = require('./users');
const {Products} = require('./products');
const {Reviews} = require('./reviews');
const {Cities} = require('./cities');

// init data
// mongoose.connect("mongodb://localhost:27017/homework7", { useNewUrlParser: true });
// new Users({
//     id: 1,
//     login: 'login',
//     username: 'user name',
//     password: 'password',
//     email: 'email@epam.com'
// }).save();
// new Users({
//     id: 2,
//     login: 'log',
//     username: 'user',
//     password: 'password',
//     email: 'at@ag.com'
// }).save();
// Products.create({
//     id: 1,
//     title: 'tv',
//     description: 'description',
//     rate: 4,
//     price: 100500
// });
// Products.create({
//     id: 2,
//     title: 'notebook',
//     description: 'notebook description',
//     rate: 3,
//     price: 1500
// });
// Reviews.create({
//     id: 1,
//     review: 'great',
//     productId: 1,
//     userId: 1
// });
// Reviews.create({
//     id: 2,
//     review: 'good',
//     productId: 2,
//     userId: 1
// });
// Cities.create({name: 'Brest', country: 'Belarus', capital: false, location: {lat: 52.097621, long: 23.734050}});
// Cities.create({name: 'Moscow', country: 'Russia', capital: true, location: {lat: 51.097621, long: 22.734050}});
// Cities.create({name: 'Minsk', country: 'Belarus', capital: true, location: {lat: 50.097621, long: 20.734050}});

module.exports = {
    Users,
    Products,
    Reviews,
    Cities
};
