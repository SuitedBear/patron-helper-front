import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    <App
      serverAddress={
        (process.env.REACT_APP_SERVER_URI || 'https://patron-helper-test-back.herokuapp.com')
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
);
