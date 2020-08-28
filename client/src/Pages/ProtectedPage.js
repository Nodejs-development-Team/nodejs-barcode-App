import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AppContext } from './../App'

const ProtectedPage = props => {

      // GlobalAppStateContext Handled here...
      const GlobalApplicationContext = useContext(AppContext)
      const isLoggedin =   GlobalApplicationContext.isAuthenticated

    useEffect(() => {
        debugger
        console.log('THIS IS A PROTECTED ROUTE!')
        console.log(isLoggedin)
    }, [])

    // if user is Authenticated will go to whatever wrapper component was passed else will be redirected out to the Signin page
    const dynamicRender = () => isLoggedin ? props.children : <Redirect to="/Signin"/>

    return <>{dynamicRender()}</>

}

export default ProtectedPage