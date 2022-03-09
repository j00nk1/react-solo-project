// -------------- Importing files/functions ----------
import { csrfFetch } from "./csrf";

// -------- Constants --------
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// ---------------- Action Creators -----------
const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// ---------------- Thunk Actions -------------
export const login = user => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch("/api/session");

  const data = await res.json();
  if (!data.user) return;
  dispatch(setUser(data.user));
  return res;
};

export const signupUser = user => async dispatch => {
  const { email, username, password } = user;

  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return data;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return res;
};

// --------------- Reducer ----------------
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
