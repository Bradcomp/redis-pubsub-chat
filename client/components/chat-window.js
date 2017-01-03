'use strict';

import React from 'react';
import { ChatItem } from './chat-item';


export function ChatWindow({chatStream = []}) {
  return (
  <div className="container">
    <div className="is-8 is-offset-2 box chat-box">
      {
        chatStream
          .map(
            ({nickname, chatText}, ndx) =>
              <ChatItem nickname={nickname} chatText={chatText} key={ndx} />
          )
      }
    </div>
  </div>
);
}
