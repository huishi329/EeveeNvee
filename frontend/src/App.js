import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import { getAllSpots, getHostingSpots } from "./store/spot";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const allSpots = useSelector(state => state.spots.allSpots);
  useEffect(() => {
    dispatch(getAllSpots());
    // check if backend has attempted to restore the user
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
      // Load all spots the user hosts
      .then(() => dispatch(getHostingSpots()))
      .catch(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        {allSpots && <SpotList spots={Object.values(allSpots)}></SpotList>}
      </Switch>

    </>
  );
}

export default App;
