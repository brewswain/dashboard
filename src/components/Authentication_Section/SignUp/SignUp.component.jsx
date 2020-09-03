import React, { useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import "./SignUp.style.scss";

import { FormInput } from "../../";
import { CustomButton } from "../../../modules";
import { auth, createUserInFireStore } from "../../../firebase/firebase.utils";
import { SignUpContext } from "../../../contexts";

const SignUp = ({ history }) => {
  const { signUpData, setSignUpData } = useContext(SignUpContext);

  const { displayName, email, password, confirmPassword } = signUpData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = signUpData;

    if (password !== confirmPassword) {
      alert("Passwords don't match :/");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserInFireStore(user, { displayName });

      setSignUpData({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

  return (
    <div className="signup__container">
      <div className="signup__title">Sign Up!</div>
      <div className="signup__subtitle">
        Hey there! Sign up using your email and password.
      </div>
      <form onSubmit={handleSubmit} className="signup__form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
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
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
      <div className="signup__link__wrapper">
        Already have an account?{" "}
        <Link className="signup__link" to="/">
          Sign in here.
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
