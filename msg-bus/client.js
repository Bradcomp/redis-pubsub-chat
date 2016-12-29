'use strict';

export default function sseConnect(url) {
  const src = new window.EventSource(url);

  const on = function(event, handler, once) {
    if (event === 'message')
      throw Error('message is not a valid event name');

    const f = e => {
      const data = JSON.parse(e.data);
      handler(data);
    }
    src.addEventListener(event, f, {once});
    return {
      off() {
        src.removeEventListener(event, f);
      }
    }
  };

  return {
    on(e, handler) {
      return on(e, handler, false);
    },
    once(e, handler) {
      return on(e, handler, true);
    }
  }
};
