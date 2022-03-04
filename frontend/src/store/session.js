// ----------------Importing Packages --------------

// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------
const SET_SESSION_USER = "session/SET_SESSION_USER";
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER";

// ---------------- Action Creators -----------
export const setSessionUser = user => {
  return {
    type: SET_SESSION_USER,
    user,
  };
};

export const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER,
  };
};

// ---------------- Thunk Actions -------------
export const loginUser = user => async dispatch => {
  const { credential, password } = user;

  const res = await csrfFetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential, password }),
  });
  const data = await res.json();
  dispatch(setSessionUser(data));
  return data;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch("/api/session");

  const data = await res.json();
  dispatch(setSessionUser(data.user));
  return res;
};

export const signupUser = user => async dispatch => {
  const { email, username, password } = user;

  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  dispatch(setSessionUser(data.user));
  return data;
};

// --------------- Reducer ----------------
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE_SESSION_USER:
      return { ...state };
    default:
      return state;
  }
};

export default sessionReducer;
