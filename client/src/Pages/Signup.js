import React from "react";

function Signup() {
  return (
    <div className="form sign-up">
      <h2>Sign Up</h2>
      <label>
        <span>Name</span>
        <input type="text" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" />
      </label>
      <label>
        <span>Confirm Password</span>
        <input type="password" />
      </label>
      <button type="button" className="submit">
        Sign Up Now
      </button>
    </div>
  );
}

export default Signup;
