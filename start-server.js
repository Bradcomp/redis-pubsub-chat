'use strict';
const app = require('./app');
const http = require('http');

app.set('port', 3000);

var server = http.createServer(app);

server.listen(3000);
