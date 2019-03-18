const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const parsedQuery = require('./middlewares');
const {productsRouter, usersRouter, citiesRouter} = require('./routes');

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });

const app = express();
app.use(cookieParser());
app.use(parsedQuery);
app.use(bodyParser.json());
app.use('/api/cities', citiesRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('*', (req, res) => {
    res.status(404);
    res.send('Page is not found');
});
app.use('*', (err, req, res) => {
    res.status(500);
    res.send('Server error');
});

module.exports = app;

