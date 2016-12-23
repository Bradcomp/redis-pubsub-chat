var redis = require('redis');
var pub = redis.createClient();

setInterval(() => {
  pub.publish('message_bus', `The time is ${new Date().toString()}`);
}, 3000);
