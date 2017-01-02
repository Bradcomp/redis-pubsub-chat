'use strict';

import React from 'react';
import R from 'ramda';

import { post } from '../request';

function Input({handler, keypress = () => {}, placeholder, value}) {
  return (
    <p className="control">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handler}
        onKeyPress={keypress}
      />
    </p>
  )
}

export class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      chatText: ''
    }
  }
  updateText(txt) {
    this.setState(R.assoc('chatText', txt));
  }
  updateNick(nick) {
    this.setState(R.assoc('nickname', nick));
  }
  submit(nickname, chatText) {
    if (!nickname || !chatText) return false;

    return post('/chat', {nickname, chatText})
      .fork(console.log, () => {
        this.updateText('');
      });
  }
  getNick(e) {
    this.updateNick(e.target.value);
  }
  getText(e) {
    return this.updateText(e.target.value);
  }
  keypress(e) {
    if (e.which !== 13) return;

    return this.submit(this.state.nickname, this.state.chatText);
  }
  render() {
    return (
      <form>
        <div className="container">
          <div className="column is-one-third">
            <Input handler={this.getNick.bind(this)} placeholder="Nickname" value={this.state.nickname} />
          </div>
          <div className="column">
            <Input
              handler={this.getText.bind(this)}
              keypress={this.keypress.bind(this)}
              placeholder="Type here dummy"
              value={this.state.chatText}
            />
          </div>
        </div>
      </form>
    )
  }
}
