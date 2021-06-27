import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import 'regenerator-runtime/runtime';
import './i18n.js';
import 'babel-polyfill';

render(<App />, document.querySelector('#main'));
