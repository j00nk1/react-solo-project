// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------

const CREATE_NOTE = "notes/createNote";
const LOAD_NOTES = "notes/loadNotes";
const LOAD_SINGLE_NOTE = "notes/loadSingleNote";
const UPDATE_NOTE = "notes/updateNote";
const REMOVE_NOTE = "notes/removeNote";
const REMOVE_STATE = "notes/removeState";

// ---------------- Action Creators -----------
const createNote = note => {
  return {
    type: CREATE_NOTE,
    note,
  };
};

const loadNotes = notes => {
  return {
    type: LOAD_NOTES,
    notes,
  };
};

const loadSingleNote = note => {
  return {
    type: LOAD_SINGLE_NOTE,
    note,
  };
};

const updateNote = note => {
  return {
    type: UPDATE_NOTE,
    note,
  };
};

const removeNote = note => {
  return {
    type: REMOVE_NOTE,
    note,
  };
};

const removeState = () => {
  return {
    type: REMOVE_STATE,
  };
};

// ---------------- Thunk Actions -------------
// POST
export const addNote = note => async dispatch => {
  const { userId, title, content } = note;
  let notebookId = "";
  if (note.notebookId) {
    notebookId = note.notebookId;
  }
  const res = await csrfFetch(`/api/users/${userId}/notes/`, {
    method: "POST",
    body: JSON.stringify({ title, content, notebookId }),
  });
  const data = await res.json();
  dispatch(createNote(data));
  return data;
};

// GET all notes OR notebook's notes
export const fetchNotes =
  ({ userId, notebookId }) =>
  async dispatch => {
    let res;
    if (notebookId)
      res = await csrfFetch(
        `/api/users/${userId}/notebooks/${notebookId}/notes`
      );
    else res = await csrfFetch(`/api/users/${userId}/notes/`);

    if (res.ok) {
      const notes = await res.json();
      dispatch(loadNotes(notes));

      return notes;
    } else {
      return;
    }
  };

// GET the most recently updated note
export const fetchRecentNote =
  ({ userId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notes/`);
    if (res.ok) {
      const notes = await res.json();
      const note = notes[0];
      dispatch(loadSingleNote(note));
      return note;
    }
  };

// GET a note
export const fetchSingleNote =
  ({ userId, noteId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}`);
    if (res.ok) {
      const note = await res.json();
      dispatch(loadSingleNote(note));
      return note;
    }
  };

// UPDATE a note
export const patchNote = note => async dispatch => {
  const { userId, id, title, content } = note;
  let notebookId = "";
  if (note.notebookId) {
    notebookId = note.notebookId;
  }
  const res = await csrfFetch(`/api/users/${userId}/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content, notebookId }),
  });

  if (res.ok) {
    const editedNote = await res.json();
    dispatch(updateNote(editedNote));
    return editedNote;
  }
};

// DELETE note
export const deleteNote = note => async dispatch => {
  const { userId, noteId } = note;

  const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
    method: "DELETE",
  });

  const deletedNote = await res.json();

  dispatch(removeNote(deletedNote));
};

// Remove states when logout
export const removeNoteState = () => dispatch => {
  dispatch(removeState());
  return;
};

// --------------- Reducer ----------------
const initialState = {};

const noteReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTE:
      newState = { ...state };
      newState[action.note.id] = action.note;
      return newState;

    case LOAD_NOTES:
      // TODO try delete the state
      newState = { ...state };
      if (!action.notes) return newState;
      action.notes.forEach(note => (newState[note.id] = note));
      return { ...state, ...newState };

    case LOAD_SINGLE_NOTE:
      newState = { ...state };
      newState[action.note.id] = action.note;
      return { ...state, ...newState };

    case UPDATE_NOTE:
      newState = { ...state };
      newState[action.note.id] = action.note;
      return newState;

    case REMOVE_NOTE:
      newState = { ...state };
      delete newState[action.note.id];
      return newState;

    case REMOVE_STATE:
      newState = { ...state };
      newState = { note: null };
      return newState;
    default:
      return state;
  }
};

export default noteReducer;
