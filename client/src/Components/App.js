import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const App = () => {

  useEffect(() => {
    readAllUsers()
  }, 
  [])

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const controlHandler = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    if(name === 'userid') {
      setUserId(value)
    } else if(name === 'password') {
      setPassword(value)
    } else {
      console.log(`incorrect binding, no control with name ---> ${name}`)
    }
  }



  // HTTP CALL ONE
  const readAllUsers = () => {
    Axios.get('/users/readAll').then((axiosResponse) => {
      console.dir(axiosResponse)
    }).catch((axiosError) => {
      console.dir(axiosError)
    })
  }

  // HTTP CALL TWO
  const addUser = () => {
    Axios.post('/users/add', {username: userId, password})
    .then((axiosResponse) => {
      console.dir(axiosResponse)
    }).catch((axiosError) => {
      console.dir(axiosError)
    })

  }


  return <div>
    
    <input 
      name="userid"
      type="text" 
      value={userId} 
      placeholder="user id"
      onChange={controlHandler}
    />

    <input 
      name="password"
      type="password" 
      value={password} 
      placeholder="user password"
      onChange={controlHandler}
    />

     <input type="button" onClick={addUser} value="add new User"/> 
    {/**/}




  </div>


}

export default App;
