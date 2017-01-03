'use strict';

import React from 'react';

import sseConnect from '../../msg-bus/client';

import { ChatWindow } from './chat-window';
import { ChatForm } from './chat-form';

export class App extends React.Component {
  constructor(props) {
    super(props);
    const messageBus = sseConnect('/stream');
    this.state = {
      chatStream: props.chatStream
    }

    messageBus.on('chat', this.renderChatItem.bind(this));
  }
  componentDidMount() {
    this.renderChatItem({nickname: 'CHATBOT 3000', chatText: 'WELCOME HUMAN'});
  }
  renderChatItem(item) {
    this.setState(previousState => ({
      chatStream: previousState.chatStream.concat(item)
    }));
  }
  render() {
    return (
      <div>
        <ChatWindow chatStream={this.state.chatStream} />
        <ChatForm />
      </div>
    );
  }
}
