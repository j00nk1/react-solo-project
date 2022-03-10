import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as noteActions from "../../store/note";

function NoteList({ props }) {
  const { noteListPath, id, notes } = props; //id === userId
  const history = useHistory();
  const dispatch = useDispatch();
  const info = useSelector(state => state.note);

  useEffect(() => {
    console.log("what's in the info??", info);
  }, [info]);
  return (
    <>
      <h2 id="list_title">
        <i className="fa-solid fa-note-sticky"></i> Notes
      </h2>
      {notes.length &&
        notes.map(note => (
          <li
            key={note.id}
            onClick={() => {
              dispatch(
                noteActions.fetchSingleNote({ userId: id, noteId: note.id })
              );
              return history.push(`${noteListPath}/${note.id}`);
            }}
          >
            {note.title}
            <small>{note.updatedAt}</small>
          </li>
        ))}
      <li onClick={() => dispatch(noteActions.fetchNotes({ userId: id }))}></li>
    </>
  );
}

export default NoteList;
