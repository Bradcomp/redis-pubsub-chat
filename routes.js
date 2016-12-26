'use strict';

const express = require('express');
const router = express.Router();
const url = process.env.REDIS_URL || null;

const msgBus = require('./msg-bus')({url});


router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/assets/index.html`);
});

router.get('/ping/:msg', (req, res) => {
  msgBus.emit('ping', req.params.msg);
  res.sendStatus(200);
});

router.post('/chat', (req, res) => {
  const msg = req.body;
  if (!msg.nickname || !msg.chatText) return res.sendStatus(400);

  msgBus.emit('chat', msg);
  res.sendStatus(200);
});

router.get('/stream', (req, res) => {
  msgBus.subscribe(res);
});

module.exports = router;
