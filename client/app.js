'use strict';

import sseConnect from '../msg-bus/client';
import { post } from './request';
import marked from 'marked';

import { compose, getValue, listenTo } from './utils';

//Initial setup
var messageBus = sseConnect('/stream');
var model = {
  nickname: '',
  chatText: '',
  chatbot: {
    welcome: ['Welcome user.  Don\'t mess things up!']
  }
}

//Our input and output elements
const nickNode = document.getElementById('nickname');
const chatNode = document.getElementById('chat-text');
const convoNode = document.getElementById('chat');

//Event handlers
const updateName = (name) => model.nickname = name;
listenTo(nickNode, 'keyup', compose(updateName, getValue));

const updateText = (text) => model.chatText = text;
const submit = ({nickname, chatText}) => {
  if (!nickname || !chatText) return false;
  chatNode.value = '';
  
  return post('/chat', {nickname, chatText}).fork(console.log, () => updateText(''));
};

listenTo(chatNode, 'keyup', (e) =>
  e.which === 13  ?
    submit(model) :
    compose(updateText, getValue)(e)
);

const renderChatItem = ({nickname, chatText}) => {
  var chatText = marked(`__${nickname}: __ ${chatText}`, {sanitize: true});

  var div = document.createElement('div');
  div.innerHTML = chatText;

  convoNode.appendChild(div);
  convoNode.scrollTop = convoNode.scrollHeight;
}
model.chatbot.welcome.forEach(chatText => {
  renderChatItem({nickname: 'CHATBOT 3000', chatText: chatText.toUpperCase()});
});
messageBus.on('chat', renderChatItem);
