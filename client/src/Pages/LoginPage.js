import React, { useState, useContext } from "react";
import { AppContext } from "./../App";
import Signup from './Signup'
// Other Libs
import { Redirect } from "react-router-dom";

import { Pill } from './../Components/Pill'

// SERVICES INJECTED HERE
import UserApiService from "./../Service/API/UserApiService"
import TokenService from "./../Service/Security/TokenService"

const LoginPage = ({signIn}) => {
  // STATES FOR THIS COMPONENT ARE DECLARED HERE
  const [email, setEmail] = useState("Rebecca Amos")  
  const [password, setPassword] = useState("fatface")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignupPane, setIsSignupPane] = useState(false)

  // GlobalAppStateContext Handled here...
  const GlobalApplicationContext = useContext(AppContext);
  const isLoggedin = GlobalApplicationContext.isAuthenticated;
  const setIsLoggedIn = GlobalApplicationContext.setIsAuthenticated;

  /**
   * Function is used to bind control of email and password state
   */
  const controlHandler = (event) => {
    const target = event.target;
    const { name, value } = target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      // Should Never hit here!
      console.log(`incorrect binding, no control with name ---> ${name}`);
    }
  }

  const toggle = () => setIsSignupPane(!isSignupPane)

  const passwordShowToggle = () => {
    setShowPassword(!showPassword)
  }

  const buildForm = () => {

    const _formClass = "formA"
    let _contClassName = 'cont'
    if(isSignupPane) _contClassName += ' s-signup'

    return (
      <form className="center flexWrap fullDim">
        <div className={_contClassName}>
          <div className="form sign-in">
            <h2>Sign In</h2>
            <label>
              <span>Email Address</span>
              <input value={email} onChange={controlHandler} className={_formClass} type="email" name="email" />
            </label>
            <label>
              <span>Password</span>
              <div className="flexWrap">
                <input value={password} onChange={controlHandler} className={_formClass} type={showPassword ? "text" : "password"} name="password" />
                <Pill color="white" leftText="hide" rightText="show" size="medium" isActive={showPassword} onClick={passwordShowToggle}/>
              </div>
            </label>
            <button className="submit" onClick={() => signIn(email, password)} type="button">Sign In</button>
            <p className="forgot-pass center flexWrap"><span className="redOnHover">Forgot Password?</span></p>
          </div>
          <div className="sub-cont">
            <div className="img">
              <div className="img-text m-up">
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className="img-text m-in">
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div className="img-btn" onClick={toggle}>
                <span className="m-up">Sign Up</span>
                <span className="m-in">Sign In</span>
              </div>
            </div>
            <Signup/>
          </div>
        </div>
      </form>
    );
  };

  // SHOULD HAVE MORE LOGIC...LIKE IT SHOULD KNOW THAT THE MIDDLEWARE IS SETUP...WILL HAVE TO WORK ON THIS
  return isLoggedin ? <Redirect to="/" /> : buildForm();
}


// EXPOSING THE COMPONENT
export default LoginPage