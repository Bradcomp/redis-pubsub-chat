const emit = (pub, channel) => (event, data) => {
  pub.publish(channel, JSON.stringify({event, data}));
};

module.exports = emit;
