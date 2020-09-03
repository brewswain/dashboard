import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase.utils";

import "./SignIn.style.scss";

import { FormInput } from "../../";
import { CustomButton, GoogleSignInButton } from "../../../modules";
import { SignInContext } from "../../../contexts";

const SignIn = () => {
  const { signInData, setSignInData } = useContext(SignInContext);

  const { email, password } = signInData;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setSignInData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  return (
    <div className="signin__container">
      <div className="signin__title">Sign in!</div>
      <div className="signin__subtitle">
        Sign in using your Google account or email/password!
      </div>
      <form onSubmit={handleSubmit} className="signin__form">
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />

        <CustomButton type="submit">Sign In</CustomButton>
      </form>

      <GoogleSignInButton className />
      <div className="signin__link__wrapper">
        Don't have an account?{" "}
        <Link className="signin__link" to="/sign-up">
          Register here.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
