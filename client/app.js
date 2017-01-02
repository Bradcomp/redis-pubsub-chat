'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import sseConnect from '../msg-bus/client';

import { App } from './components/app';

//Initial setup
var messageBus = sseConnect('/stream');

const appNode = document.getElementById('app');
let chatStream = [];

const renderChatItem = (chatMsg) => {
  chatStream = chatStream.concat(chatMsg);
  const el = <App chatStream={chatStream} />;
  ReactDOM.render(el, appNode);
}

renderChatItem({nickname: 'CHATBOT 3000', chatText: 'WELCOME HUMAN'});

messageBus.on('chat', renderChatItem);
