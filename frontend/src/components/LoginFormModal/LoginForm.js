import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const info = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async res => {
      const data = await res.json();
      if (data && data.errors) {
        await setErrors(data.errors);
        return data;
      }
    });
    if (info?.user?.id) return history.push(`/users/${info.user.id}`);
  };

  const demoLogin = async e => {
    e.preventDefault();
    await dispatch(
      sessionActions.login({
        credential: "Demo-User",
        password: "password",
      })
    );
    return history.push(`/users/1`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="error">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={e => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button onClick={demoLogin}>Demo User</button>
    </form>
  );
}

export default LoginForm;
