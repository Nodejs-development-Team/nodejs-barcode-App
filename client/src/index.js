import React from 'react';
import ReactDOM from 'react-dom';

// all CSS imports done here
import './css/index.css'// approved
import './css/flexbox.css'// approved
// import './css/App.css'// NOT approved
import './css/SignupSignIn.css'// WIP
import './css/Pill.css'// approved


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