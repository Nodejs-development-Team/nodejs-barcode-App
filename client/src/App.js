import React, { useState, useEffect, createContext } from 'react'
import { HashRouter as Router, Switch, Route } from "react-router-dom"

// SERVICES INJECTED HERE
import TokenService from './Service/Security/TokenService'
import UserApiService from './Service/API/UserApiService'

// PAGES
import LoginPage            from './Pages/LoginPage'
import MainPage             from './Pages/MainPage'
import UserManagementPage   from './Pages/UserManagementPage'

// Will have to know the context at runtime...
export const AppContext = createContext(null)

// const skipAuthentication = false

export default () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(async () => {
    try {      
      // FINDING OUT IF WE ARE GOING TO BE SKIPPING THE AUTHENTICATION STEP AS STORED IN .env
      const skipAuthenticationRequest = await UserApiService.getAuthSettings()
      if(skipAuthenticationRequest && skipAuthenticationRequest.data) {
        if(skipAuthenticationRequest.data.SkipAuth) {
          setIsAuthenticated(true)
        } else {
          authenticationLogic()
        }
      }
    } catch (error) {
      authenticationLogic()
    }
  }, 
  [])


  const authenticationLogic = async () => {

    // WHEN APP STARTS THE FIRST THING WE NEED TO DO IS TRY TO READ THE JWT FROM LOCAL STORAGE
    const localStoreJWT = TokenService.retrieveTokenFromLocalStore()
    console.log(localStoreJWT)
    // IF THIS IS EMPTY STRING, WE KNOW WE ARE NOT AUTHENTICATED
    // TELL APP WE ARE NOT AUTHENTICATED
    if(localStoreJWT === '') {
      // alert('User is NOT authenticated, needs to be Authenticated')
      setIsAuthenticated(false)
    }
    // IF WE GET A STRING, MEANS WE HAVE A JWT ON LOCALSTORE, 
    // THEN WE WILL NEED TO VALIDATE THAT JWT
    // IF VALID TOKEN WE WILL NEED TO TELL MIDDLEWARE OF OUR TOKEN
    // ELSE WE NEED TO CHANGE STATE OF APP TO NOT AUTHENTICATED AND REMOVE TOKEN FROM STORE
    else {
      // alert('attempting to validate the token')
      try {
        const tokenValidationResponse = await UserApiService.validateToken(localStoreJWT)
        console.log(tokenValidationResponse.data.isSuccess)
        if(tokenValidationResponse && tokenValidationResponse.data && tokenValidationResponse.data.isSuccess) {
          // WE NEED TO REDIRECT THE USER TO MAIN... LoginPage will do this for us....
          // alert('Token is still Valid, need to redir user to main(root)')
          setIsAuthenticated(true)
        }

      } catch (error) {
        console.dir(error)
        // WILL NEED TO DO WHAT I SAID ABOVE.... ----> ELSE WE NEED TO CHANGE STATE OF APP TO NOT AUTHENTICATED AND REMOVE TOKEN FROM STORE
      }
    }

  }


  const signIn = async (email, password) => {
    try {
      const goodAxiosResponse = await UserApiService.signin(email, password);
      if (goodAxiosResponse && goodAxiosResponse.data) {
        if (goodAxiosResponse.data.isSuccess) {
          TokenService.setTokenToLocalStorage(goodAxiosResponse.data.jwt);
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          TokenService.removeTokenFromStorage()
        }
      }
    } catch (error) {
        console.dir(error)
        setIsAuthenticated(false)
        TokenService.removeTokenFromStorage()
    }
  }





  return <AppContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
    <Router>
      <Switch>
        
        <Route exact path='/'>
          <MainPage />
        </Route>

        <Route exact path='/Signin'>
          <LoginPage signIn={signIn}/>
        </Route>

        <Route exact path="/UserManagement">
          <UserManagementPage/>
        </Route>

      </Switch>
    </Router>
  </AppContext.Provider>
}