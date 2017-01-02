'use strict';

import React from 'react';

import { ChatWindow } from './chat-window';
import { ChatForm } from './chat-form';


export function App({chatStream}) {
  return (
    <div>
      <ChatWindow chatStream={chatStream} />
      <ChatForm />
    </div>
  )
}
