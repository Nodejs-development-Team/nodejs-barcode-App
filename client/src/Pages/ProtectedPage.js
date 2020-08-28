import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const ProtectedPage = props => {

    useEffect(() => {
        debugger
        console.log('THIS IS A PROTECTED ROUTE!')
    }, [])

    // WILL NEED TO GRAB THIS VALUE FROM SOMEKIND OF STATE MANAGEMENT OR CONTEXT...SPEAK TO GROUP HOW WE WANT TO HANDLE THIS
    const [isAuthenticated, setAuthenticated] = useState(false)

    // if user is Authenticated will go to whatever wrapper component was passed else will be redirected out to the Signin page
    const dynamicRender = () => isAuthenticated ? props.children : <Redirect to="/Signin"/>

    return <>{dynamicRender()}</>

}

export default ProtectedPage