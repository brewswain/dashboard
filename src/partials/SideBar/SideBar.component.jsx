import React from "react";

import "./SideBar.style.scss";

import { HomeIcon } from "../../assets";

const SideBar = () => (
  <div className="sidebar__container">
    <a href="#home" className="sidebar__icon">
      <HomeIcon className="sidebar__icon--active" />
    </a>
  </div>
);

export default SideBar;
