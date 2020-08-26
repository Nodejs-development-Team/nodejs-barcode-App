import React, { useState } from 'react';


const App = () => {

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


  // LoginScreen for now...
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
      placeholder="user id"
      onChange={controlHandler}
    />

  </div>


}

export default App;
