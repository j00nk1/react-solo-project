import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNotebookContext } from "../../context/NotebookContext";
import * as notebookActions from "../../store/notebook";

function NotebookList({ props }) {
  const { noteListPath, notebookListPath, username, id } = props;
  const userId = props.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    selectedNotebook,
    setSelectedNotebook,
    notebookTitle,
    setNotebookTitle,
    notebookList,
    setNotebookList,
  } = useNotebookContext();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const nbInfo = await dispatch(
  //     notebookActions.addNotebook({ userId: id, title })
  //   );
  // };

  return (
    <>
      <h2 id="list_title">
        <i className="fa-solid fa-book"></i> Notebook
      </h2>
    </>
  );
}

export default NotebookList;
