'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use('/', require('./routes'));

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});
module.exports = app;
