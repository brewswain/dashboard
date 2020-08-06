import React from "react";
import { NavLink } from "react-router-dom";

import "./SideBar.style.scss";

import { HomeIcon, LogOutIcon, NotesIcon } from "../../assets";
import { auth } from "../../firebase/firebase.utils";

const SideBar = () => {
  return (
    <div className="sidebar__container">
      <NavLink exact to="/" activeClassName="sidebar__icon--active">
        <HomeIcon className="sidebar__icon" />
      </NavLink>

      <NavLink to="/notes" activeClassName="sidebar__icon--active">
        <NotesIcon className="sidebar__icon" />
      </NavLink>

      <LogOutIcon
        className="sidebar__icon"
        onClick={() => {
          auth.signOut();
        }}
      />
    </div>
  );
};

export default SideBar;
