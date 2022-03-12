import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useListContext } from "../../context/ListContexts";
import { useNotebookContext } from "../../context/NotebookContext";
import * as noteActions from "../../store/note";
import * as notebookActions from "../../store/notebook";

function NewNote() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const userId = path.split("/")[2];
  const history = useHistory();

  const { setNotes } = useListContext();
  const {
    selectedNotebook,
    setSelectedNotebook,
    notebookList,
    setNotebookList,
  } = useNotebookContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    const loadNotebook = async () => {
      const notebooks = await dispatch(
        notebookActions.fetchNotebooks({ userId })
      );
      setNotebookList(notebooks);
      setSelectedNotebook("");
    };
    loadNotebook();
  }, [dispatch]);

  // Error handling
  useEffect(() => {
    if (!submitClicked) return;
    const err = [];
    if (!title.length) err.push("Please input title");
    if (title.length > 20) err.push("Title must be less than 20 characters");
    if (!content.length) err.push("Please input content");
    return setErrors(err);
  }, [title, submitClicked, content]);

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    if (!errors.length) {
      const notebookId = selectedNotebook;
      await dispatch(
        noteActions.addNote({ userId, title, content, notebookId })
      );
      const noteList = await dispatch(noteActions.fetchNotes({ userId }));
      setNotes(noteList);
      setContent("");
      setTitle("");
      setSelectedNotebook("");
      setSubmitClicked(false);
      return await history.push(`/users/${userId}/notes/new`);
    }
  };

  const cancelBtn = async e => {
    if (content || title) {
      if (window.confirm("Are you sure you want to discard the change?")) {
        setContent("");
        setTitle("");
        setSelectedNotebook("");
        setSubmitClicked(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && submitClicked && (
        <ul className="error">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
      <label>Choose Notebook</label>
      <select
        onChange={e => setSelectedNotebook(e.target.value)}
        value={selectedNotebook}
      >
        <option value={""}>--Notebook--</option>
        {notebookList.length > 0 &&
          notebookList.map(notebook => (
            <option key={notebook.id} value={notebook.id}>
              {notebook.title}
            </option>
          ))}
      </select>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Start writing note!"
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>
      <div className="form_btn_container">
        <button type="submit" onClick={() => setSubmitClicked(true)}>
          Submit
        </button>
        <button className="btn_alert" onClick={cancelBtn} type="reset">
          Discard
        </button>
      </div>
    </form>
  );
}

export default NewNote;
