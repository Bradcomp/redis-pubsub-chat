'use strict';

const express = require('express');
const router = express.Router();

const msgBus = require('./msg-bus')({});


router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/assets/index.html`);
});

router.get('/ping/:msg', (req, res) => {
  msgBus.emit('ping', req.params.msg);
  res.sendStatus(200);
});

router.get('/stream', (req, res) => {
  msgBus.subscribe(res);
});

module.exports = router;
