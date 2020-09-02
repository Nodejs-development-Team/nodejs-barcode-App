import React, { useState, useContext } from "react";
import { AppContext } from "./../App";
import Signup from './Signup'
// Other Libs
import { Redirect } from "react-router-dom";

// SERVICES INJECTED HERE
import UserApiService from "./../Service/API/UserApiService";
import TokenService from "./../Service/Security/TokenService";

export default () => {
  // STATES FOR THIS COMPONENT ARE DECLARED HERE
  const [userId, setUserId] = useState("Rebecca Amos");
  const [password, setPassword] = useState("fatface");

  // GlobalAppStateContext Handled here...
  const GlobalApplicationContext = useContext(AppContext);
  const isLoggedin = GlobalApplicationContext.isAuthenticated;
  const setIsLoggedIn = GlobalApplicationContext.setIsAuthenticated;

  /**
   * Function is used to bind control of userid and password state
   */
  const controlHandler = (event) => {
    const target = event.target;
    const { name, value } = target;
    if (name === "userid") {
      setUserId(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      // Should Never hit here!
      console.log(`incorrect binding, no control with name ---> ${name}`);
    }
  };

  /**
   * Function is used to sign the user in, triggered when user clicks on the signin button
   */

  const signIn = async () => {
    try {
      const goodAxiosResponse = await UserApiService.signin(userId, password);
      if (goodAxiosResponse && goodAxiosResponse.data) {
        if (goodAxiosResponse.data.isSuccess) {
          TokenService.setTokenToLocalStorage(goodAxiosResponse.data.jwt);
          setIsLoggedIn(true);
        } else TokenService.removeTokenFromStorage();
      }
    } catch (error) {
      console.dir(error);
    }
  };

  function toggle() {
      console.log('inside toggle');
      document.querySelector(".cont").classList.toggle("s-signup");
  }

  const buildForm = () => {
    return (
      <div className="cont">
        <div className="form sign-in">
          <h2>Sign In</h2>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" />
          </label>
          <button className="submit" type="button">
            Sign In
          </button>
          <p className="forgot-pass">Forgot Password ?</p>
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
          <Signup></Signup>
        </div>
      </div>
    );
  };

  // SHOULD HAVE MORE LOGIC...LIKE IT SHOULD KNOW THAT THE MIDDLEWARE IS SETUP...WILL HAVE TO WORK ON THIS
  return isLoggedin ? <Redirect to="/" /> : buildForm();
};
