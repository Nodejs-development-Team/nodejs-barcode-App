import React, { useState } from "react"
import { Pill } from './../Components/Pill'
import UserApiService from './../Service/API/UserApiService'

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const passwordShowToggle = () => setShowPassword(!showPassword)


  const submitForm = () => {

    const jsonPayload = {
      username: name,
      email,
      password
    }

    UserApiService.Signup(jsonPayload).then((AxiosResponse) => {
      console.dir(AxiosResponse)
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

  return (
    <div className="form sign-up">
      <h2>Sign Up</h2>
      <label>
        <span>Name</span>
        <input 
          name="name" 
          className={className} 
          type="text" 
          onChange={handleFieldChange}
          value={name}
        />
      </label>
      <label>
        <span>Email</span>
        <input 
          name="email" 
          className={className} 
          type="email" 
          onChange={handleFieldChange}
          value={email}
        />
      </label>

      <label>
        <span>Password</span>
        <div className="flexWrap">
          <input 
            name="password" 
            className={className} 
            type={showPassword ? "text" : "password"} 
            name="password" 
            onChange={handleFieldChange}
            value={password}
          />
          <Pill color="white" leftText="hide" rightText="show" size="medium" isActive={showPassword} onClick={passwordShowToggle}/>
        </div>
      </label>

      <label>
        <span>Confirm Password</span>
        <input 
          name="passwordConfirm" 
          className={className} 
          type="password" 
          onChange={handleFieldChange} 
          value={passwordConfirm}
        />
      </label>

      <input className="submit" value="Sign Up Now" type="button" onClick={submitForm}/>

    </div>
  );
}

export default Signup;
