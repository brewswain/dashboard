import React from "react";

import "./GoogleSignInButton.style.scss";

import { GoogleIcon } from "../../assets";
import { signInWithGoogle } from "../../firebase/firebase.utils";

const GoogleSignInButton = () => (
  <button
    className="google__signin__button"
    onClick={() => {
      signInWithGoogle();
    }}
  >
    <GoogleIcon className="google__signin__icon" />
    <div className="google__signin__container">
      <div className="google__signin__text">Sign in with Google</div>
    </div>
  </button>
);

export default GoogleSignInButton;
