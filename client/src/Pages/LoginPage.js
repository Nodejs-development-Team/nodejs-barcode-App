import React, { useState } from 'react'

// Other Libs
import { Redirect } from 'react-router-dom'

// SERVICES INJECTED HERE
import UserApiService from './../Service/API/UserApiService'
import TokenService from './../Service/Security/TokenService'

export default () => {

  // STATES FOR THIS COMPONENT ARE DECLARED HERE
  const [userId, setUserId]       = useState('Rebecca Amos')
  const [password, setPassword]   = useState('fatface')

  // TEMP STATE....THIS SHOULD COME FROM REDUX OR CONTEXT OR SOMETHING...
  const [isLoggedin, setIsLoggedIn] = useState(false)


  /**
   * Function is used to bind control of userid and password state 
   */
  const controlHandler = (event) => {
    const target = event.target
    const { name, value } = target
    if(name === 'userid') {
      setUserId(value)
    } else if(name === 'password') {
      setPassword(value)
    } else {
      // Should Never hit here!
      console.log(`incorrect binding, no control with name ---> ${name}`)
    }
  }


  /**
   * Function is used to sign the user in, triggered when user clicks on the signin button
   */
  const signIn = async () => {
    try {
      const goodAxiosResponse = await UserApiService.signin(userId, password)
      if(goodAxiosResponse && goodAxiosResponse.data) {
        if(goodAxiosResponse.data.isSuccess) {
          TokenService.setTokenToLocalStorage(goodAxiosResponse.data.jwt)
          // THEN WE NEED TO TELL OUR APP WE HAVE BEEN AUTHENTICATED
          setIsLoggedIn(true)// THIS IS BAD WILL NEED TO FIX THIS

          
        }
        else TokenService.removeTokenFromStorage()
      }
    } catch (error) {
      debugger
      console.dir(error)
    }
  }

  const buildForm = () => {
    return <div>
      {/* USER ID CONTROL */}    
      <input 
        name="userid"
        type="text" 
        value={userId} 
        placeholder="user id"
        onChange={controlHandler}
      />

      {/* PASSWORD CONTROL */}
      <input 
        name="password"
        type="password" 
        value={password} 
        placeholder="user password"
        onChange={controlHandler}
      />

      {/* THIS CONTROL BELONGS SOMEWHERE ELSE MAYBE, I AM COMMENTING THIS OUT FOR NOW... */}
      {/*<input type="button" onClick={addUser} value="add new User"/>*/}

      {/* SIGNIN BUTTON CONTROL */}
      <input type="button" onClick={signIn} value="Sign In"/> 
    </div>

  }


  return isLoggedin ? <Redirect to="/"/> : buildForm()

}