import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as noteActions from "../../store/note";
import * as notebookActions from "../../store/notebook";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, user]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(noteActions.removeNoteState());
    dispatch(notebookActions.removeNotebookState());
    history.push("/");
  };

  const userHome = e => {
    history.push(`/users/${user.id}`);
  };

  return (
    <div className="header_right_user">
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && user && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <button onClick={userHome} style={{ margin: "5px" }}>
            HOME
          </button>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
