import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'

const App = () => {

  useEffect(() => {

    UserGetFetch()
    UserPostFetch()

  },
  [])


  const UserGetFetch = () => {
    Axios.get('/user').then((userResponse) => {
      console.dir(userResponse.data)
    }).catch((error) => {
      console.dir(error)
    })
  }

  const UserPostFetch = () => {
    
    const data = {
      email:      'testingemail@yahoo.com', 
      password:   'difficultPassword', 
      userid:     'hotLittleBiscuit'
    }
    
    Axios.post('/user/authenticate', data).then((userResponse) => {
      console.dir(userResponse.data)
    }).catch((error) => {
      console.dir(error)
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
