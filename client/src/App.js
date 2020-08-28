import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import TokenService from './Service/Security/TokenService'
import UserApiService from './Service/API/UserApiService'

// PAGES
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'


export default () => {
  
  useEffect(async () => {

    // WHEN APP STARTS THE FIRST THING WE NEED TO DO IS TRY TO READ THE JWT FROM LOCAL STORAGE
    debugger
    const localStoreJWT = TokenService.retrieveTokenFromLocalStore()
    console.log(localStoreJWT)
    // IF THIS IS EMPTY STRING, WE KNOW WE ARE NOT AUTHENTICATED
    // TELL APP WE ARE NOT AUTHENTICATED
    if(localStoreJWT === '') {
      alert('User is NOT authenticated, needs to be Authenticated')
    }
    // IF WE GET A STRING, MEANS WE HAVE A JWT ON LOCALSTORE, 
    // THEN WE WILL NEED TO VALIDATE THAT JWT
    // IF VALID TOKEN WE WILL NEED TO TELL MIDDLEWARE OF OUR TOKEN
    // ELSE WE NEED TO CHANGE STATE OF APP TO NOT AUTHENTICATED AND REMOVE TOKEN FROM STORE
    else {
      alert('attempting to validate the token')
      try {
        debugger
        const tokenValidationResponse = await UserApiService.validateToken(localStoreJWT)
        console.log(tokenValidationResponse.data.isSuccess)
        if(tokenValidationResponse && tokenValidationResponse.data && tokenValidationResponse.data.isSuccess) {
          // WE NEED TO REDIRECT THE USER TO MAIN... LoginPage will do this for us....
          alert('Token is still Valid, need to redir user to main(root)')
        }

      } catch (error) {
        console.dir(error)
        // WILL NEED TO DO WHAT I SAID ABOVE.... ----> ELSE WE NEED TO CHANGE STATE OF APP TO NOT AUTHENTICATED AND REMOVE TOKEN FROM STORE
      }
    }

  }, 
  [])

  return <Router>
  <Switch>
    
    <Route exact path='/'>
      <MainPage />
    </Route>

    <Route exact path='/Signin'>
      <LoginPage />
    </Route>

  </Switch>
</Router>
}