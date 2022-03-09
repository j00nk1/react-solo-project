// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------

const CREATE_NOTEBOOK = "notes/createNotebook";
const LOAD_NOTEBOOKS = "notes/loadNotebooks";
const LOAD_SINGLE_NOTEBOOK = "notes/loadSingleNotebook";
const REMOVE_NOTEBOOK = "notes/removeNotebook";

// ---------------- Action Creators -----------
const createNotebook = newNotebook => {
  return {
    type: CREATE_NOTEBOOK,
    payload: newNotebook,
  };
};

const loadNotebooks = notebooks => {
  return {
    type: LOAD_NOTEBOOKS,
    payload: notebooks,
  };
};

const loadSingleNotebook = notebook => {
  return {
    type: LOAD_SINGLE_NOTEBOOK,
    payload: notebook,
  };
};

const removeNotebook = notebook => {
  return {
    type: REMOVE_NOTEBOOK,
    notebook,
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

// // GET all notes
// export const fetchNotes =
//   ({ userId, notebookId }) =>
//   async dispatch => {
//     const res = await csrfFetch(
//       `/api/users/${userId}/notebooks/${notebookId}/notes/`
//     );
//     if (res.ok) {
//       const notes = await res.json();
//       dispatch(loadNotes(notes));
//       return notes;
//     }
//   };

// // GET a note
// export const fetchSingleNote =
//   ({ userId, notebookId, noteId }) =>
//   async dispatch => {
//     const res = await csrfFetch(
//       `/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`
//     );
//     if (res.ok) {
//       const note = await res.json();
//       dispatch(loadSingleNote(note));
//       return note;
//     }
//   };

// // DELETE note
// export const deleteNote = note => async dispatch => {
//   const { userId, notebookId, noteId } = note;
//   const res = await csrfFetch(
//     `/api/users/${userId}/notebooks/${notebookId}/notes/${noteId}`,
//     {
//       method: "DELETE",
//     }
//   );

//   const deletedNote = await res.json();
//   dispatch(removeNote(deletedNote));
//   return deletedNote;
// };

// --------------- Reducer ----------------
const initialState = { notebook: null };

const notebookReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = { ...state };
      newState.note = action.payload;
      return newState;
    case LOAD_NOTEBOOKS:
      const notebookList = {};
      action.payload.notebooks.forEach(
        notebook => (notebookList[notebook.id] = notebook)
      );
      return { ...notebookList, ...state };
    case LOAD_SINGLE_NOTEBOOK:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case REMOVE_NOTEBOOK:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default notebookReducer;
