import React from "react";
import { NavLink } from "react-router-dom";

import "./SideBar.style.scss";

import { HomeIcon, LogOutIcon, NotesIcon } from "../../assets";
import { auth } from "../../firebase/firebase.utils";

const SideBar = ({ isLoggedIn }) => {
  const handleClick = () => {
    auth.signOut();
    localStorage.clear();
    window.location.href = "/sign-in";
  };

  return (
    <div className="sidebar__container">
      {/* Proof of concept; Can display user's displayName by using the "isLoggedIn" information as a prop gleaned from localStorage */}
      {/* <div className="sidebar__displayName">{isLoggedIn.displayName}</div> */}
      <NavLink exact to="/" activeClassName="sidebar__icon--active">
        <HomeIcon className="sidebar__icon" />
      </NavLink>

      <NavLink to="/notes" activeClassName="sidebar__icon--active">
        <NotesIcon className="sidebar__icon" />
      </NavLink>

      <LogOutIcon className="sidebar__icon" onClick={handleClick} />
    </div>
  );
};

export default SideBar;
