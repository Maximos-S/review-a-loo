import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import Register from "./components/auth/Register";
import Home from "./components/Home";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [businesses, setBusinesses] = useState(false)

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} setBusinesses={setBusinesses}/>
      <div className="main-content">
        <Switch>
          <Route path="/register" exact={true}>
            <Register 
            setAuthenticated={setAuthenticated} authenticated={authenticated}
            />
          </Route>
          <Route path="/" exact={true} authenticated={authenticated}>
            <Home authenticated={authenticated} businesses={businesses}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
