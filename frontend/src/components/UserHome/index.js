import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

function UserHome() {
  const sessionUser = useSelector(state => state?.session?.user);
  const { userId } = useParams();
  let id, username;

  try {
    if (!sessionUser) throw new Error("Please log in");
    id = sessionUser.id;
    username = sessionUser.username;

    if (id !== +userId)
      throw new Error("You are not authorized to see this page");
  } catch (e) {
    console.error(e);

    // TODO: Make an error component and render the error message(passed as prop)
    return <Redirect to="/error" error={e} />;
  }

  return <div>This is {username}'s Home</div>;
}

export default UserHome;
