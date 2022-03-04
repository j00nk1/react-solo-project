import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

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
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <ul className="header">
      <li>
        <NavLink exact to="/" className="navLeft">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
