import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './i18n.js';

render(<App />, document.querySelector('#main'));
