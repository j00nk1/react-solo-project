import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import logo from "./images/logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <button>
            <NavLink to="/signup">Sign Up</NavLink>
          </button>
        </li>
      </>
    );
  }

  return (
    <header className="header_container">
      <ul className="nav_header">
        <li className="nav_left">
          <NavLink exact to="/">
            <img src={logo} alt="yen-logo" className="logo" />
          </NavLink>
        </li>
        <ul className="nav_right_container">{isLoaded && sessionLinks}</ul>
      </ul>
    </header>
  );
}

export default Navigation;
