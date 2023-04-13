import React from 'react';
import ReactDOM from 'react-dom';
import './style/reset.css';
import './style/layout.scss';

const element = document.getElementById('app');

import App from './components/App/App';

ReactDOM.render(<App/>, element);