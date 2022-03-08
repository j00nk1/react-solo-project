import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import NotebookList from "./NotebookList";
import NoteList from "./NoteList";
import "./UserHome.css";

function UserHome() {
  const [showNote, setShowNote] = useState(true);
  const [showNotebook, setShowNotebook] = useState(false);
  const history = useHistory();

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

  const userPath = `/users/${userId}`;
  const notebookListPath = `${userPath}/notebooks`;

  // ↓↓↓↓↓↓ TODO: Need notebookId & noteId, fetch and import into this file ↓↓↓↓↓↓

  const notebookPath = `${notebookListPath}/:notebookId`; // need to replace id

  const noteListPath = `${notebookPath}/notes`;

  const notePath = `${noteListPath}/:noteId`; // need to replace id

  // ↑↑↑↑↑ TODO: Need notebookId & noteId, fetch and import into this file ↑↑↑↑↑

  const homeOnClick = e => {
    e.preventDefault();
    history.push(userPath);
  };

  const createNoteOnClick = e => {
    e.preventDefault();
    history.push(`${noteListPath}/new`);
  };

  const noteListOnClick = e => {
    e.preventDefault();
    setShowNote(true);
    setShowNotebook(false);
    history.push(`${noteListPath}`);
  };

  const notebookListOnClick = e => {
    e.preventDefault();
    setShowNotebook(true);
    setShowNote(false);
    history.push(`${notebookListPath}`);
  };

  return (
    <div className="home_main">
      <div className="side_container">
        <ul className="sidebar">
          <li>
            <button title={`${username}'s Home`} onClick={homeOnClick}>
              <i className="fas fa-house-user"></i>
            </button>
          </li>
          <li>
            <button title={`New Note`} onClick={createNoteOnClick}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </li>
          <li>
            <button title="Notes" onClick={noteListOnClick}>
              <i className="fa-solid fa-note-sticky"></i>
            </button>
          </li>
          <li>
            <button title="Notebooks" onClick={notebookListOnClick}>
              <i className="fa-solid fa-book"></i>
            </button>
          </li>
        </ul>
        <ul className="side_list">
          <li>LIST AEW AEF AEF ADF ANFWEFNAWELFN da</li>
          <li>LIST</li>
          {showNote && <NoteList />}
          {showNotebook && <NotebookList />}
        </ul>
      </div>

      {/* If the note list is selected, render selected note */}
      <div className="note_selected">
        {/* If there is no note, render "Create a Note" */}
        {/* If there is, render the note in the top of the list*/}
      </div>

      {/* If the notebook list is shown, render the list of the note from the selected notebook*/}
      <div className="note_list"></div>
    </div>
  );
}

export default UserHome;
