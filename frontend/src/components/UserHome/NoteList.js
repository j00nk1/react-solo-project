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

  const toTime = date => {
    const updatedAt = new Date(date);
    // const currentTime = new Date(date)
    const updatedYear = updatedAt.getFullYear();
    const updatedMonth = updatedAt.getMonth();
    const updatedDay = updatedAt.getDate();
    let updatedHour = updatedAt.getHours();
    let updatedMinutes = updatedAt.getMinutes();
    if (updatedHour < 10) updatedHour = `0${updatedHour}`;
    if (updatedMinutes < 10) updatedMinutes = `0${updatedMinutes}`;

    return `Update: ${
      updatedMonth + 1
    }/${updatedDay}/${updatedYear} ${updatedHour}:${updatedMinutes}`;
  };

  return (
    <>
      <h2 id="list_title">
        <i className="fa-solid fa-note-sticky"></i> Notes
      </h2>
      {!notes.length && (
        <>
          <h3>NO NOTES</h3>
          <p>
            <br />
            Let's Start Creating!
          </p>
        </>
      )}
      {notes.length > 0 &&
        notes.map(note => (
          <li
            id={note.id}
            key={note.id}
            style={{ position: "relative" }}
            onClick={async () => {
              const fetchedNote = await dispatch(
                noteActions.fetchSingleNote({ userId: id, noteId: note.id })
              );
              setRenderNote(fetchedNote);
              return history.push(`${noteListPath}/${note.id}`);
            }}
          >
            {note.title}
            <br />
            <small
              style={{
                position: "absolute",
                right: "5px",
                bottom: 0,
                color: "gray",
              }}
            >
              {toTime(note.updatedAt)}
            </small>
          </li>
        ))}
    </>
  );
}

export default NoteList;
