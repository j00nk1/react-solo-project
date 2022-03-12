import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useListContext } from "../../context/ListContexts";
import * as noteActions from "../../store/note";

function NotebookChildren({ props }) {
  const { userId, notebookId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { setRenderNote } = useListContext();

  const notesObj = useSelector(state => state);
  console.log(notesObj);
  // const matchingNotes = Object.values(notesObj).filter(
  //   note => note.notebookId === notebookId
  // );
  console.log();

  const user = useSelector(state => state.session.user);

  // const notesFetch = dispatch(noteActions.fetchNotes({ userId, notebookId }));

  // const notes = notesFetch();
  // console.log("++++++++++++++++++++++++++", notes); // return Promise {<pending>}
  return (
    <>
      {/* <ul className="noteShow">
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
      </ul> */}
    </>
  );
}

export default NotebookChildren;
