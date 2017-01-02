'use strict';

const mongo = require('mongojs');
const Future = require('fluture');
const collections = ['messages'];
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/the-chort';
const db = mongo(url, collections);

const find = (coll, query, options = {}) =>
  Future((reject, resolve) =>
    db[coll].find(
      query,
      options,
      (err, result) => err ? reject(err) : resolve(result))
  );

const insert = (coll, record, options = {}) =>
  Future((reject, resolve) =>
    db[coll].insert(
      Object.assign({}, record),
      options,
      (err, result) => err ? reject(err) : resolve(result))
  );

module.exports = {find, insert};
