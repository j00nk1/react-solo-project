import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";

import { useListContext } from "../../context/ListContexts";
import NotebookList from "./NotebookList";
import NoteList from "./NoteList";
import NoteForm from "../NoteForm";
import * as noteActions from "../../store/note";
import * as notebookActions from "../../store/notebook";

import "./UserHome.css";
import RenderNote from "../NoteForm/RenderNote";
import Landing from "../Landing";

function UserHome() {
  const [selected, setSelected] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    showNote,
    setShowNote,
    showNotebook,
    setShowNotebook,
    notes,
    setNotes,
    setRenderNote,
  } = useListContext();
  const sessionUser = useSelector(state => state?.session?.user);
  const { userId } = useParams();

  let id, username;
  try {
    if (!sessionUser) throw new Error("Please log in");
    id = sessionUser.id;
    username = sessionUser.username;

    if (id !== +userId)
      throw new Error("You are not authorized to see this page");
    dispatch(noteActions.fetchNotes({ userId }));
    dispatch(notebookActions.fetchNotebooks({ userId }));
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
    setSelected("");

    setShowNote(false);
    setShowNotebook(false);

    history.push(userPath);
  };

  const createNoteOnClick = async e => {
    e.preventDefault();
    setSelected("noteForm");
    const noteList = await dispatch(noteActions.fetchNotes({ userId }));
    setNotes(noteList);
    setShowNote(true);
    setShowNotebook(false);
    history.push(`${noteListPath}/new`);
  };

  const noteListOnClick = async e => {
    e.preventDefault();
    setSelected("renderNote");
    const noteList = await dispatch(noteActions.fetchNotes({ userId }));
    setNotes(noteList);

    setShowNote(true);
    setShowNotebook(false);
    const keys = Object.keys(noteList);
    if (!keys.length) return history.push(`${noteListPath}/new`);
    const recentNote = await dispatch(noteActions.fetchRecentNote({ userId }));
    setRenderNote(recentNote);
    const { id } = recentNote;

    history.push(`${noteListPath}/${id}`);
  };

  const notebookListOnClick = async e => {
    e.preventDefault();
    setSelected("renderNotebook");
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
        {showNote && (
          <ul className="side_list">
            <NoteList props={{ noteListPath, id, notes }} />
          </ul>
        )}
        {showNotebook && (
          <ul className="side_list">
            <NotebookList
              props={{ noteListPath, notebookListPath, username, id }}
            />
          </ul>
        )}
      </div>

      {/* If the note list is selected, render selected note */}
      {!selected && (
        <>
          <Redirect to={`/users/${userId}`}></Redirect>
          <Landing />
        </>
      )}
      {selected && (
        <div className="note_selected">
          <Switch>
            <Route exact path={`${noteListPath}/new`}>
              <NoteForm />
            </Route>
            <Route path={`${noteListPath}/:noteId`}>
              <RenderNote />
            </Route>
          </Switch>
          {/* {selected === "noteForm" && <NoteForm />} */}
          {/* {selected === "renderNote" && <RenderNote />} */}
          {/* If there is no note, render "Create a Note" */}
          {/* If there is, render the note in the top of the list*/}
        </div>
      )}

      {/* If the notebook list is shown, render the list of the note from the selected notebook*/}
      <div className="note_list"></div>
    </div>
  );
}

export default UserHome;
