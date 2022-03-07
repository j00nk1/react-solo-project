import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function UserHome() {
  const sessionUser = useSelector(state => state?.session?.user);
  let id, username;
  try {
    // TODO: check the user with user id and limit the access to other user's page
    id = sessionUser.id;
    username = sessionUser.username;

    if (!sessionUser) throw new Error();
  } catch (e) {
    console.error("Please log in.", e);

    return <Redirect to="/error" />;
  }

  return <div>This is {username}'s Home</div>;
}

export default UserHome;
