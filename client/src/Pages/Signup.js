import React, { useState, useContext } from "react"
import { AppContext } from './../App'
import { Pill } from './../Components/Pill'
import UserApiService from './../Service/API/UserApiService'
import TokenService from './../Service/Security/TokenService'

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordShowToggle = () => setShowPassword(!showPassword)
  const passwordConfirmShowToggle = () => setShowConfirmPassword(!showConfirmPassword)

  const GlobalApplicationContext = useContext(AppContext);
  const setIsLoggedIn = GlobalApplicationContext.setIsAuthenticated;


  const submitForm = () => {

    const jsonPayload = {
      username: name,
      email,
      password
    }

    UserApiService.Signup(jsonPayload).then((goodAxiosResponse) => {
      if (goodAxiosResponse && goodAxiosResponse.data) {
        if (goodAxiosResponse.data.isSuccess) {
          TokenService.setTokenToLocalStorage(goodAxiosResponse.data.jwt);
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          TokenService.removeTokenFromStorage()
        }
      }


    }).catch((axiosError) => {
      console.dir(axiosError)
    })
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    let functionPointer
    switch (name) {
      case "name":
        functionPointer = setName
        break;
      case "email":
        functionPointer = setEmail
        break;
      case "password":
        functionPointer = setPassword
        break;
      case "passwordConfirm":
        functionPointer = setPasswordConfirm
        break;
    }
    functionPointer(value)
  }

  const className="formA"

  const isValid = password.length > 0 
    && passwordConfirm.length > 0 
    && name.length > 0
    && email.length > 0
    && password === passwordConfirm


  return (
    <div className="form sign-up">
      <h2 className="largeLabel">Sign Up</h2>
      <label className="loginLabel">
        <span>Name</span>
        <input 
          name="name" 
          className={className} 
          type="text" 
          onChange={handleFieldChange}
          value={name}
        />
      </label>
      <label className="loginLabel">
        <span>Email</span>
        <input 
          name="email" 
          className={className} 
          type="email" 
          onChange={handleFieldChange}
          value={email}
        />
      </label>

      <label className="loginLabel">
        <span>Password</span>
        <div className="flexWrap">
          <input 
            name="password" 
            className={className} 
            type={showPassword ? "text" : "password"} 
            onChange={handleFieldChange}
            value={password}
          />
          <Pill color="white" leftText="hide" rightText="show" size="medium" isActive={showPassword} onClick={passwordShowToggle}/>
        </div>
      </label>


      <label className="loginLabel">
      <span>Confirm Password</span>
        <div className="flexWrap">
          <input 
            name="passwordConfirm" 
            className={className} 
            type={showConfirmPassword ? "text" : "password"} 
            onChange={handleFieldChange}
            value={passwordConfirm}
          />
          <Pill color="white" leftText="hide" rightText="show" size="medium" isActive={showConfirmPassword} onClick={passwordConfirmShowToggle}/>
        </div>
      </label>

      <input disabled={!isValid} className="submit" value="Sign Up Now" type="button" onClick={submitForm}/>

    </div>
  );
}

export default Signup;
