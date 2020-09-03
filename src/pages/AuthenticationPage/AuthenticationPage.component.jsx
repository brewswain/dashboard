import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./AuthenticationPage.style.scss";

import { SignInContext, SignUpContext } from "../../contexts";
import { SignIn, SignUp } from "../../components";
import { HomePage } from "..";

const AuthenticationPage = () => {
  const [signInData, setSignInData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Notes: finish applying context to sign in and sign up stuff.

  return (
    <div className="authentication__page">
      <div className="authentication__form">
        <SignInContext.Provider value={{ signInData, setSignInData }}>
          <Route path="/sign-in" component={SignIn} />
          <Route exact path="/" component={HomePage} />
        </SignInContext.Provider>
        <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
          <Route path="/sign-up" component={SignUp} />
        </SignUpContext.Provider>
      </div>
    </div>
  );
};

export default AuthenticationPage;
