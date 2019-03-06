const express = require('express');
const cookieParser = require('cookie-parser');
const parsedQuery = require('./middlewares');
const bodyParser = require('body-parser');
const {productsRouter, usersRouter} = require('./routes');

const app = express();
app.use(cookieParser());
app.use(parsedQuery);
app.use(bodyParser.json());
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

