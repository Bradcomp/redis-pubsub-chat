'use strict';

const express = require('express');
const router = express.Router();

const url = process.env.REDIS_URL || null;
const msgBus = require('../msg-bus')({url});

const { find, insert } = require('./mongo');


const saveChat = ({nickname, chatText}) =>
  insert('messages', {nickname, chatText, date: new Date()});


router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/assets/index.html`);
});

router.post('/chat', (req, res) => {
  const {nickname, chatText} = req.body;
  if (!nickname || !chatText) return res.sendStatus(400);

  saveChat({nickname, chatText})
    .fork(
      () => res.sendStatus(500),
      () => {
        msgBus.emit('chat', {nickname, chatText});
        res.sendStatus(200);
      }
    );
});

router.get('/load', (req, res) => {

});

router.get('/stream', (req, res) => {
  msgBus.subscribe(res);
});

module.exports = router;
