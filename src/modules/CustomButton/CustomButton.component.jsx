import React from "react";

import "./CustomButton.style.scss";

const CustomButton = ({ children }) => (
  <button className="custom__button">{children}</button>
);

export default CustomButton;
