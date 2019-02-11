const express = require('express');
const cookieParser = require('cookie-parser')
const {productsRouter, usersRouter} = require('./routes');

const app = express();
app.use(cookieParser());
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('*', (req, res) => {
    res.status(404);
    res.send('Страница не найдена');
});
app.use('*', (err, req, res, next) => {
    res.status(500);
    res.send('Ошибка на сервере');
});

module.exports = app;

