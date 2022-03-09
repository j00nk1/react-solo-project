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
  const { userId, notebookId, title, content } = note;
  const res = await csrfFetch(
    `/api/users/${userId}/notebooks/${notebookId}/notes/`,
    {
      method: "POST",
      body: JSON.stringify({ title, content }),
    }
  );
  const data = await res.json();
  dispatch(createNote(data.note));
  return data;
};

// GET all notes
// loadNotes
export const fetchNotes =
  ({ userId, notebookId }) =>
  async dispatch => {
    const res = await csrfFetch(
      `/api/users/${userId}/notebooks/${notebookId}/notes/`
    );
    if (res.ok) {
      const notes = await res.json();
      dispatch(loadNotes(notes));
      return notes;
    }
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
    default:
      return state;
  }
};

export default noteReducer;
