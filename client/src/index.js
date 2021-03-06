import React from 'react';
import ReactDOM from 'react-dom';

// all CSS imports done here
import './css/index.css'
import './css/flexbox.css'
import './css/SignupSignIn.css'
import './css/Pill.css'

import App from './App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()