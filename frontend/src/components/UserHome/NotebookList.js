import React from "react";
import { useDispatch } from "react-redux";
import * as notebookActions from "../../store/notebook";

function NotebookList({ props }) {
  const { noteListPath, notebookListPath, username, id } = props;
  const dispatch = useDispatch();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const nbInfo = await dispatch(
  //     notebookActions.addNotebook({ userId: id, title })
  //   );
  // };

  return (
    <>
      <h2>
        <i className="fa-solid fa-book"></i> Notebook
      </h2>
    </>
  );
}

export default NotebookList;
