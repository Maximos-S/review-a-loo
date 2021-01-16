import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import { authenticate } from "./services/auth";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import BusinessProfile from "./components/businessprofile/BusinessProfile";
import {UserContext} from "./components/context/UserContext"
import Footer from "./components/footer/Footer";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [businesses, setBusinesses] = useState(false)
  const [business, setBusiness] = useState(false)
  const [user, setUser] = useState(false)
  const [reviews, setReviews] = useState([])
  const [editReview, setEditReview] = useState(false)
  const [mapCoordinates, setMapCoordinates] = useState(false)

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
        <div className="main-content">
      <UserContext.Provider value={ {
        editReview, setEditReview,
        user,setUser, 
        authenticated, setAuthenticated, 
        setBusiness, business, 
        setBusinesses, businesses, 
        reviews, setReviews,
        mapCoordinates, setMapCoordinates
        } }>
        <NavBar />
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
          <Footer />
      </UserContext.Provider>
        </div>
    </BrowserRouter>
  );
}

export default App;
