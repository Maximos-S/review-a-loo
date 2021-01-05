import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Autocomplete from 'react-google-autocomplete';
import './navBar.css'

const NavBar = ({ setAuthenticated, authenticated, setUser, user }) => {
    const [onRegister, setOnRegister] = useState(false)

    let history = useHistory()
    let location = useLocation()
    useEffect(() => {
        if (location.pathname.endsWith("/register")) {
            setOnRegister(true)
        } else {
            setOnRegister(false)
        }
        return () => {
        }
    }, [location]);
    const rerouteHome = () => {
        history.push("/")
    }

    const rerouteRegister = () => {
        history.push("/register")
        
    }

    let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};


    return (
        <nav className="nav-bar">
            <script
            src={`https://maps.googleapis.com/maps/api/js?key=
        &callback=activatePlacesSearch&libraries=places&v=weekly`}
            defer
            ></script>
            <div className="logo">
                <div className="home-link" onClick={rerouteHome}>
                Review-a-Loo
                </div>
            </div>
            <div className="search-bar-container">
                <Autocomplete
                    style={{width: '90%'}}
                    onPlaceSelected={(place) => {
                    console.log(place);
                    }}
                    types={['(cities)']}
                    componentRestrictions={{country: "usa"}}
                />
            </div>
            <div className="user-buttons">
            {authenticated?
            <>
                <LogoutButton setAuthenticated={setAuthenticated} setUser={setUser} />
            </>
            :
            <>
                {!onRegister && <button className="nav-button" onClick={rerouteRegister}>Register</button>}
            </>
            }
            </div>
        </nav>
    );
}

export default NavBar;