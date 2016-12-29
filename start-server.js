'use strict';
const app = require('./server/app');
const http = require('http');

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('App is running on port', app.get('port'));
});
