import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useListContext } from "../../context/ListContexts";
import * as noteActions from "../../store/note";

function NotebookChildren({ props }) {
  const { userId, notebookId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setRenderNote } = useListContext();

  const notesFetch = dispatch(noteActions.fetchNotes({ userId, notebookId }));

  const notes = notesFetch;
  console.log("++++++++++++++++++++++++++", notes); // return Promise {<pending>}
  return (
    <ul className="noteShow">
      {notes.map(note => (
        <li
          key={`note_${note.id}`}
          onClick={async () => {
            const fetchedNote = await dispatch(
              noteActions.fetchSingleNote({ userId, noteId: note.id })
            );
            setRenderNote(fetchedNote);
            return history.push(`/users/${userId}/notes/${note.id}`);
          }}
        >
          {note.title}
        </li>
      ))}
    </ul>
  );
}

export default NotebookChildren;
