import React from "react";
import { useSelector } from "react-redux";

function NoteList({ props }) {
  const { notePath, notebookPath, username, id } = props;
  // usrId is string

  return (
    <>
      <h2>
        <i className="fa-solid fa-note-sticky"></i> Notes
      </h2>
      <li>This is Note List</li>
      <li>{id}</li>
    </>
  );
}

export default NoteList;
