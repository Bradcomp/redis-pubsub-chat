'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/app';


const appNode = document.getElementById('app');
const chatStream = [];
const el = <App chatStream={chatStream} />;

ReactDOM.render(el, appNode);
