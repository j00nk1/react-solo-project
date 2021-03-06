import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// -------------- Components --------------
import Landing from "./components/Landing";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import UserHome from "./components/UserHome";
import { ListProvider } from "./context/ListContexts";
import { NotebookProvider } from "./context/NotebookContext";

// ------------- Store files --------------
import * as sessionActions from "./store/session";
import Errors from "./components/Errors";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const pageError = [];

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
            <ListProvider>
              <NotebookProvider>
                <UserHome />
              </NotebookProvider>
            </ListProvider>
          </Route>
          <Route path="*">
            {/*TODO:Make Error handling components with sidebar <Error /> */}
            <Errors props={pageError} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
