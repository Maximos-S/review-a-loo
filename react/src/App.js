import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import BusinessProfile from "./components/businessprofile/BusinessProfile";
import {UserContext} from "./components/context/UserContext"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [businesses, setBusinesses] = useState(false)
  const [business, setBusiness] = useState(false)
  const [user, setUser] = useState(false)
  const [reviews, setReviews] = useState([])
  const [editReview, setEditReview] = useState(false)
  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setUser(user)
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
      <UserContext.Provider value={ {editReview, setEditReview,user,setUser, authenticated, setAuthenticated, setBusiness, business, setBusinesses, businesses, reviews, setReviews} }>
        <NavBar />
        <div className="wave" ><svg className="wave-svg"viewBox="0 0 500 150" preserveAspectRatio="none"><path className="wave-path" d="M-28.21,75.48 C63.76,143.58 204.85,-2.45 505.64,93.25 L500.00,0.00 L0.00,0.00 Z"></path></svg></div>
        <div className="main-content">
          <Switch>
            <Route path="/register" exact={true}>
              <Register 
              // setAuthenticated={setAuthenticated} authenticated={authenticated}
              />
            </Route>
            <Route path="/business/:businessId" exact={true}>
              <BusinessProfile 
              // setAuthenticated={setAuthenticated} authenticated={authenticated} setBusiness={setBusiness} business={business}
              // user={user}
              />
            </Route>
            <Route path="/" exact={true} authenticated={authenticated}>
              <Home authenticated={authenticated} businesses={businesses} setBusiness={setBusiness}/>
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
