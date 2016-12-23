(function(window) {
  window.sseConnect = function(url) {
    var src = new window.EventSource(url);

    var on = (event, handler, once) => {
      if (event === 'message')
        throw Error('message is not a valid event name');

      src.addEventListener(event, e => {
        var data = JSON.parse(e.data);
        handler(data);
      }, {once});
    };

    return {
      on(e, handler) {
        return on(e, handler, false);
      },
      once(e, handler) {
        return on(e, handler, true);
      }
    }
  }
})(window);
