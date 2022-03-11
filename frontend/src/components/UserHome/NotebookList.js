import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useNotebookContext } from "../../context/NotebookContext";
import { NotebookListMaker } from "./NotebookListMaker";
import * as notebookActions from "../../store/notebook";
import * as noteActions from "../../store/note";

function NotebookList({ props }) {
  const { noteListPath, notebookListPath, username, id } = props;
  const userId = props.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const { notebookTitle, setNotebookTitle, notebookList, setNotebookList } =
    useNotebookContext();
  const [selectedNotebook, setSelectedNotebook] = useState([]);
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    const loadNotebooks = async () => {
      const notebooks = await dispatch(
        notebookActions.fetchNotebooks({ userId })
      );
      await setNotebookList(notebooks);
      // TODO: render notes based on notebookId
    };
    loadNotebooks();
  }, [dispatch]);

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
      {NotebookListMaker(notebookList)}
    </>
  );
}

export default NotebookList;
