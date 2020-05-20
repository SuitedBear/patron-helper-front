import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    <App
      serverAddress={
        (process.env.SERV_URI || 'http://127.0.0.1:3000')
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
);
