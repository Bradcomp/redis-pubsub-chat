'use strict';

const redis = require('redis');


const subscribe = (channel) => (res) => {
  const sub = redis.createClient();
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  sub.on('message', (channel, message) => {
    const {event, data} = JSON.parse(message);
    res.write(`event: ${event.toString()}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  sub.subscribe(channel);
  return {
    unsubscribe() {
      sub.unsubscribe();
      sub.quit();
    }
  };
}

module.exports = subscribe;
