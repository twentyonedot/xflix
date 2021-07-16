import Home from "./Components/Home";
import VideoPage from "./Components/VideoPage";
import React, { useLayoutEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

export const config = {
  endpoint: `https://twentyonedot-xflix.herokuapp.com/v1`,
};

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      <Route path="/video/:id" exact>
        <VideoPage />
      </Route>

      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
