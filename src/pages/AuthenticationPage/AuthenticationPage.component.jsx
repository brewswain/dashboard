import React from "react";
import { Route } from "react-router-dom";

import "./AuthenticationPage.style.scss";
import { SignIn, SignUp } from "../../components";

const AuthenticationPage = () => {
  return (
    <div className="authentication__page">
      <div className="authentication__form">
        <Route exact path="/" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
