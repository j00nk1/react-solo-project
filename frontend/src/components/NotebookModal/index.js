import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateNotebook from "./CreateNotebook";

function NotebookModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNotebook />
        </Modal>
      )}
    </>
  );
}

export default NotebookModal;
