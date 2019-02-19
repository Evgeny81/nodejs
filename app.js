const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const {parsedQuery} = require('./middlewares');

const {productsRouter, usersRouter, authRouter} = require('./routes');
const app = express();
app.use(cookieParser());
app.use(parsedQuery);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/auth', authRouter);

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

