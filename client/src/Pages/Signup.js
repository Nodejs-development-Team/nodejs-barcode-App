import React from "react";

function Signup() {
  const className="formA"
  return (
    <div className="form sign-up">
      <h2>Sign Up</h2>
      <label>
        <span>Name</span>
        <input className={className} type="text" />
      </label>
      <label>
        <span>Email</span>
        <input className={className} type="email" />
      </label>
      <label>
        <span>Password</span>
        <input className={className} type="password" />
      </label>
      <label>
        <span>Confirm Password</span>
        <input className={className} type="password" />
      </label>
      <button type="button" className="submit">Sign Up Now</button>
    </div>
  );
}

export default Signup;
