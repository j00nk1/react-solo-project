import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as noteActions from "../../store/note";

import { useListContext } from "../../context/ListContexts";

function NoteList({ props }) {
  const { noteListPath, id, notes } = props; //id === userId
  const history = useHistory();
  const dispatch = useDispatch();

  const { setRenderNote } = useListContext();

  return (
    <>
      <h2 id="list_title">
        <i className="fa-solid fa-note-sticky"></i> Notes
      </h2>
      {notes.length &&
        notes.map(note => (
          <li
            id={note.id}
            key={note.id}
            onClick={async () => {
              const fetchedNote = await dispatch(
                noteActions.fetchSingleNote({ userId: id, noteId: note.id })
              );
              setRenderNote(fetchedNote);
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
