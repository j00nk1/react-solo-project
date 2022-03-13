import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useNotebookContext } from "../../context/NotebookContext";
import * as notebookActions from "../../store/notebook";

function CreateNotebook({ props }) {
  const { setNotebookList } = useNotebookContext();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!submitClicked) return;
    const err = [];
    if (!title.length) err.push("Please input title");
    if (title.length > 20) err.push("Title must be less than 20 characters");
    return setErrors(err);
  }, [title, submitClicked]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (errors.length) return;

    const newNb = await dispatch(
      notebookActions.addNotebook({ userId, title })
    ).catch(async res => {
      const data = await res.json();
      if (data && data.errors) {
        await setErrors(data.errors);
        return data;
      }
    });
    if (newNb.title) {
      props(false);
      const nbList = await dispatch(notebookActions.fetchNotebooks({ userId }));
      setNotebookList(nbList);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <ul className="error">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Notebook Title
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="notebook title"
          required
        />
      </label>
      <div className="form_btn_container">
        <button type="submit" onClick={() => setSubmitClicked(true)}>
          Create Notebook
        </button>
        <button
          className="btn_cancel"
          type="reset"
          onClick={() => props(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateNotebook;
