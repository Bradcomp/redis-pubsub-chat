var redis = require('redis');
var sub1 = redis.createClient();
var sub2 = redis.createClient();

sub1.on('message', (_, msg) => {
  console.log(`Sub1: ${msg}`);
});
sub2.on('message', (_, msg) => {
  console.log(`Sub2: ${msg}`);
});

sub1.subscribe('message_bus');
sub2.subscribe('message_bus');
