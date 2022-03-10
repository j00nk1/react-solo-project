import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useListContext } from "../../context/ListContexts";
import { useNotebookContext } from "../../context/NotebookContext";
import * as noteActions from "../../store/note";

function RenderNote() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const userId = path.split("/")[2];
  const noteId = path.split("/")[4];
  const history = useHistory();

  const {
    renderNote,
    setNotes,
    content,
    setContent,
    title,
    setTitle,
    setRenderNote,
  } = useListContext();
  // const originalContent = content.slice();
  // const originalTitle = title.slice();
  const { selectedNotebook, setSelectedNotebook } = useNotebookContext();
  const [errors, setErrors] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    setTitle(renderNote.title);
    setContent(renderNote.content);
  }, [renderNote]);

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
      const id = noteId;
      const editedNote = await dispatch(
        noteActions.patchNote({ userId, id, title, content })
      );
      const noteList = await dispatch(noteActions.fetchNotes({ userId }));
      setNotes(noteList.notes);
      return await history.push(`/users/${userId}/notes/${editedNote.id}`);
    }
  };

  const cancelBtn = async e => {
    if (content || title) {
      if (window.confirm("Are you sure you want to discard the change?")) {
        const originalNote = await dispatch(
          noteActions.fetchSingleNote({ userId, noteId })
        );
        setContent(originalNote.content);
        setTitle(originalNote.title);
        // TODO: need to set originalNote's notebookId
        setSelectedNotebook(null);
        setSubmitClicked(false);
      }
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to DELETE this note?")) {
      await dispatch(noteActions.deleteNote({ userId, noteId }));

      const noteList = await dispatch(noteActions.fetchNotes({ userId }));

      setNotes(noteList.notes);
      const recentNote = await dispatch(
        noteActions.fetchRecentNote({ userId })
      );
      setRenderNote(recentNote);
      return await history.push(`/users/${userId}/notes/${recentNote.id}`);
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
      {/* TODO: Need to fetch the user's notebook list and render as the options */}
      <select onChange={e => setSelectedNotebook(e.target.value)}>
        <option value={null}>--Notebook--</option>
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
          Update
        </button>
        <button className="btn_cancel" onClick={cancelBtn} type="reset">
          Cancel Edit
        </button>
        <button className="btn_alert" onClick={handleDelete}>
          Delete Note
        </button>
      </div>
    </form>
  );
}

export default RenderNote;
