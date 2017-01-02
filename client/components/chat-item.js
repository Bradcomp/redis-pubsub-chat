'use strict'

import React from 'react';
import marked from 'marked';

const markText = (nick, text) => marked(`__${nick}: __ ${text}`, {sanitize: true})

export function ChatItem({nickname, chatText}) {
  return <div dangerouslySetInnerHTML={{__html: markText(nickname, chatText)}} />;
}
