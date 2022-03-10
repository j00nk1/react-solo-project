import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import NotebookList from "./NotebookList";
import NoteList from "./NoteList";
import "./UserHome.css";

import * as noteActions from "../../store/note";
import NoteForm from "../NoteForm";

function UserHome() {
  const [showNote, setShowNote] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [selected, setSelected] = useState(true);
  const [notes, setNotes] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

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
  const noteListPath = `${userPath}/notes`;

  const homeOnClick = async e => {
    e.preventDefault();

    setShowNote(false);
    setShowNotebook(false);
    history.push(userPath);
  };

  const createNoteOnClick = async e => {
    e.preventDefault();
    history.push(`${noteListPath}/new`);
  };

  const noteListOnClick = async e => {
    e.preventDefault();

    const noteList = await dispatch(noteActions.fetchNotes({ userId }));
    setNotes(noteList.notes);

    setShowNote(true);
    setShowNotebook(false);
    history.push(`${noteListPath}`);
  };

  const notebookListOnClick = async e => {
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
          {showNote && <NoteList props={{ noteListPath, id, notes }} />}
          {showNotebook && (
            <NotebookList
              props={{ noteListPath, notebookListPath, username, id }}
            />
          )}
        </ul>
      </div>

      {/* If the note list is selected, render selected note */}
      <div className="note_selected">
        <NoteForm />
        {/* If there is no note, render "Create a Note" */}
        {/* If there is, render the note in the top of the list*/}
      </div>

      {/* If the notebook list is shown, render the list of the note from the selected notebook*/}
      <div className="note_list"></div>
    </div>
  );
}

export default UserHome;
