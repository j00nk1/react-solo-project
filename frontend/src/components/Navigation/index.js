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
        <li style={{ alignSelf: "center", fontSize: 20 }}>
          <a
            href="https://github.com/j00nk1"
            rel="noreferrer"
            target="_blank"
            style={{ marginRight: 10 }}
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/junki-sato-7bb773208/"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <ul className="nav_right_container">{isLoaded && sessionLinks}</ul>
      </ul>
    </header>
  );
}

export default Navigation;
