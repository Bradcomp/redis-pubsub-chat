'use strict';
const app = require('./app');
const http = require('http');

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
