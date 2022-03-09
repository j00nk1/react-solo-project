import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as noteActions from "../../store/note";

function NoteList({ props }) {
  const { notePath, notebookPath, username, id } = props; //id === userId
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  // const {note} = useSelector(state => state?.note);

  return (
    <>
      <h2>
        <i className="fa-solid fa-note-sticky"></i> Notes
      </h2>
      <li
        onClick={() =>
          dispatch(noteActions.fetchNotes({ userId: id, notebookId }))
        }
      ></li>
    </>
  );
}

export default NoteList;
