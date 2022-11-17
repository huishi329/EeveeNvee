import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import Navigation from "./components/Navigation";
import SpotView from "./components/SpotView";
import SpotPage from "./components/SpotPage/SpotPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // check if backend has attempted to restore the user
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path='/spots/:spotId'>
          <SpotPage />
        </Route>
        <Route exact path='/'>
          <SpotView />
        </Route>
      </Switch>

    </>
  );
}

export default App;
