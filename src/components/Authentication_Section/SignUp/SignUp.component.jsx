import React from "react";
import { Link } from "react-router-dom";

import "./SignUp.style.scss";

const SignUp = () => {
  return (
    <div className="signup__container">
      <div className="signup__page">Sign up!</div>;
      <Link to="/">Already have an account? Sign in:</Link>
    </div>
  );
};

export default SignUp;
