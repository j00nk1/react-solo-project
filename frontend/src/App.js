import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// -------------- Components --------------
import Landing from "./components/Landing";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import UserHome from "./components/UserHome";

// ------------- Store files --------------
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/users/:userId" isLoaded={isLoaded}>
            <UserHome />
          </Route>
          <Route path="*">
            <h2>Page Not Found</h2>
            {/*TODO:Make Error handling components <Error /> */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
