import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { restoreUser } from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import SpotView from "./components/SpotView";
import SpotPage from "./components/SpotPage/SpotPage";
import EditSpotPage from "./components/EditSpotPage/EditSpotPage";
import HostingPage from "./components/HostingPage/HostingPage";
import CreateSpotPage from "./components/CreateSpotPage/CreateSpotPage";
import TripPage from "./components/TripPage/TripPage";

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
      <Routes>
        <Route path='/spots/:spotId/edit/*' element={<EditSpotPage />} />

        <Route path='/spots/create-listing' element={<CreateSpotPage />} />

        <Route path='/spots/:spotId' element={<SpotPage />} />

        <Route path='/listings' element={<HostingPage />} />

        <Route path='/trips/*' element={<TripPage />} />

        <Route path='/' element={<SpotView />} />

        <Route path='*' element={
          <h1 style={{ marginLeft: '5rem' }}>Page Not Found</h1>
        } />
      </Routes>

    </>
  );
}

export default App;
