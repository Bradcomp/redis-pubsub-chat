'use strict';

const redis = require('redis');
const emit = require('./emit');
const subscribe = require('./subscribe');

const msgBus = (opts) => {
  const pub = redis.createClient(opts);
  const channel = opts.channelName || 'message_bus';

  return {
    emit: emit(pub, channel),
    subscribe: subscribe(channel)
  }
};

module.exports = msgBus;
