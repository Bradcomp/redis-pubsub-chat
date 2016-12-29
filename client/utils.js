'use strict';

export function compose(f, g) {
  return (x) =>  f(g(x));
}

export function getValue(e) {
  return e && e.target && e.target.value || '';
}

export function listenTo(emitter, event, handler) {
  emitter.addEventListener(event, handler);
  return () => emitter.removeEventListener(event, handler);
};
