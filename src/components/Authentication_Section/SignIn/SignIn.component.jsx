import React from "react";
import { Link } from "react-router-dom";

import "./SignIn.style.scss";

import { signInWithGoogle } from "../../../firebase/firebase.utils";

const SignIn = () => {
  return (
    <div className="signin__container">
      <div className="signin__page" onClick={signInWithGoogle}>
        Sign in!
      </div>
      <Link to="/sign-up">Or Register here :3</Link>
    </div>
  );
};

export default SignIn;
