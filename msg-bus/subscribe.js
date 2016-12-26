'use strict';

const redis = require('redis');


const subscribe = (opts, channel) => (res) => {
  const sub = redis.createClient(opts);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.on('close', () => {
    sub.unsubscribe();
    sub.quit();
    res.end();
  })
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
      res.end();
    }
  };
}

module.exports = subscribe;
