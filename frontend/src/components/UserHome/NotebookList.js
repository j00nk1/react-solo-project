import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useNotebookContext } from "../../context/NotebookContext";
import { NotebookListMaker } from "./NotebookListMaker";
import * as notebookActions from "../../store/notebook";
import { Modal } from "../../context/Modal";
import CreateNotebook from "../NotebookModal/CreateNotebook";
import * as noteActions from "../../store/note";

function NotebookList({ props }) {
  // const { noteListPath, notebookListPath, username, id } = props;
  // const history = useHistory();
  const userId = props.id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { notebookTitle, setNotebookTitle, notebookList, setNotebookList } =
    useNotebookContext();
  const [selectedNotebook, setSelectedNotebook] = useState([]);

  useEffect(() => {
    const loadNotebook = async () => {
      const notebooks = await dispatch(
        notebookActions.fetchNotebooks({ userId })
      );
      await setNotebookList(notebooks);
    };
    loadNotebook();
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
        <i className="fa-solid fa-book"></i> Notebooks
      </h2>
      <button
        style={{ borderRadius: 0, background: "steelblue" }}
        onClick={() => setShowModal(true)}
      >
        Add Notebook <i className="fa-solid fa-folder-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNotebook props={setShowModal} />
        </Modal>
      )}
      {NotebookListMaker(notebookList)}
    </>
  );
}

export default NotebookList;
