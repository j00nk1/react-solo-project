// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------

const CREATE_NOTEBOOK = "notes/createNotebook";
const LOAD_NOTEBOOKS = "notes/loadNotebooks";
const LOAD_SINGLE_NOTEBOOK = "notes/loadSingleNotebook";
const REMOVE_NOTEBOOK = "notes/removeNotebook";
const REMOVE_NOTEBOOK_STATE = "notes/removeNotebookState";

// ---------------- Action Creators -----------
const createNotebook = newNotebook => {
  return {
    type: CREATE_NOTEBOOK,
    newNotebook,
  };
};

const loadNotebooks = notebooks => {
  return {
    type: LOAD_NOTEBOOKS,
    notebooks,
  };
};

const loadSingleNotebook = notebook => {
  return {
    type: LOAD_SINGLE_NOTEBOOK,
    notebook,
  };
};

const removeNotebook = notebook => {
  return {
    type: REMOVE_NOTEBOOK,
    notebook,
  };
};

const removeState = () => {
  return {
    type: REMOVE_NOTEBOOK_STATE,
  };
};

// ---------------- Thunk Actions -------------
// POST
export const addNotebook = notebook => async dispatch => {
  const { userId, title } = notebook;
  const res = await csrfFetch(`/api/users/${userId}/notebooks/`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  dispatch(createNotebook(data.notebook));
  return data;
};

// GET all notebooks
export const fetchNotebooks =
  ({ userId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks/`);
    if (res.ok) {
      const notebooks = await res.json();
      await dispatch(loadNotebooks(notebooks));
      return notebooks;
    }
  };

// GET a notebook
export const fetchSingleNotebook =
  ({ userId, notebookId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks/${notebookId}`);
    if (res.ok) {
      const notebook = await res.json();
      dispatch(loadSingleNotebook(notebook));
      return notebook;
    }
  };

export const fetchMainNotebook =
  ({ userId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks/`);
    if (res.ok) {
      const notebooks = await res.json();
      const mainNotebook = notebooks.filter(notebook => notebook.isMain);
      console.log(mainNotebook);
      return mainNotebook;
    }
  };

// // DELETE notebook
export const deleteNotebook =
  ({ userId, notebookId }) =>
  async dispatch => {
    const res = await csrfFetch(
      `/api/users/${userId}/notebooks/${notebookId}`,
      {
        method: "DELETE",
      }
    );
    const deletedNotebook = await res.json();
    dispatch(removeNotebook(deletedNotebook));
    return deletedNotebook;
  };

// Remove states upon logout
export const removeNotebookState = () => dispatch => {
  dispatch(removeState());
  return;
};
// --------------- Reducer ----------------
const initialState = {};

const notebookReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = { ...state };
      newState.note = action.notebook;
      return newState;

    case LOAD_NOTEBOOKS:
      const notebookList = {};
      action.notebooks.forEach(
        notebook => (notebookList[notebook.id] = notebook)
      );
      return { ...notebookList, ...state };

    case LOAD_SINGLE_NOTEBOOK:
      newState = {};
      newState[action.notebook.id] = action.notebook;
      return { ...state, newState };

    case REMOVE_NOTEBOOK:
      newState = { ...state };
      delete newState[action.notebook.id];
      return newState;

    case REMOVE_NOTEBOOK_STATE:
      newState = Object.assign({}, state);
      newState = { notebook: null };
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
