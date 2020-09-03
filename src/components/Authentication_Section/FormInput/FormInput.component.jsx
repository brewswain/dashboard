import React from "react";

import "./FormInput.style.scss";

const FormInput = ({ handleChange, label, value, ...otherProps }) => {
  return (
    <div className="form__group">
      <label className="form__label">{label}</label>
      <input className="form__input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
