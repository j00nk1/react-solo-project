import React from "react";

function NotebookList({ props }) {
  const { notePath, notebookPath, username, id } = props;
  // usrId is string

  return (
    <>
      <h2>
        <i className="fa-solid fa-book"></i> Notebook
      </h2>
    </>
  );
}

export default NotebookList;
