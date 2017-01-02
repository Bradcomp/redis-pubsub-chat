'use strict';

import Future from 'fluture';

function post(url, data) {

  return Future((reject, resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 400) return reject(xhr.responseText);

      return resolve(xhr.responseText);
    };
    xhr.send(JSON.stringify(data));
  });
}
export {post};
