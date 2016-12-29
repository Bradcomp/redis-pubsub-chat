'use strict';

import Task from 'data.task';

function post(url, data) {

  return new Task((reject, resolve) => {
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
