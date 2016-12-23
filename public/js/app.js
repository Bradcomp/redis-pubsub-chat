(function() {
  var messageBus = sseConnect('/stream');
  messageBus.on('ping', console.log);
})()
