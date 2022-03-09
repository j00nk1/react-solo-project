// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------

const CREATE_NOTE = "notes/createNote";
const LOAD_NOTES = "notes/loadNotes";
const LOAD_SINGLE_NOTE = "notes/loadSingleNote";
const UPDATE_NOTE = "notes/updateNote";
const REMOVE_NOTE = "notes/removeNote";

// ---------------- Action Creators -----------
const createNote = newNote => {
  return {
    type: CREATE_NOTE,
    payload: newNote,
  };
};

const loadNotes = notes => {
  return {
    type: LOAD_NOTES,
    payload: notes,
  };
};

const loadSingleNote = note => {
  return {
    type: LOAD_SINGLE_NOTE,
    payload: note,
  };
};

const updateNote = note => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

const removeNote = note => {
  return {
    type: REMOVE_NOTE,
    note,
  };
};

// ---------------- Thunk Actions -------------
// POST
export const addNote = note => async dispatch => {
  const { userId, title, content } = note;

  const res = await csrfFetch(`/api/users/${userId}/notes/`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  dispatch(createNote(data.note));
  return data;
};

// GET all notes
export const fetchNotes =
  ({ userId }) =>
  async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notes/`);
    if (res.ok) {
      const notes = await res.json();
      dispatch(loadNotes(notes));
      return notes;
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
  const { userId, noteId, title, content } = note;
  const res = await csrfFetch(`/api/users/${userId}/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content }),
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
  return deletedNote;
};

// --------------- Reducer ----------------
const initialState = { note: null };

const noteReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTE:
      newState = { ...state };
      newState.note = action.payload;
      return newState;
    case LOAD_NOTES:
      const noteList = {};
      action.payload.notes.forEach(note => (noteList[note.id] = note));
      return { ...noteList, ...state };
    case LOAD_SINGLE_NOTE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case UPDATE_NOTE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case REMOVE_NOTE:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default noteReducer;
