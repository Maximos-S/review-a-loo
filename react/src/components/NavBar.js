import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Autocomplete from 'react-google-autocomplete';
import './navBar.css'

const NavBar = ({ setAuthenticated, authenticated, setUser, user }) => {
    const [onRegister, setOnRegister] = useState(false)
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")


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


    const searchRegion = () => {
        console.log("hittttttts", longitude, latitude)
        return
    }

    const rerouteHome = () => {
        history.push("/")
    }

    const rerouteRegister = () => {
        history.push("/register")
        
    }

    console.log("api", process.env)

    return (
        <nav className="nav-bar">
            <div className="logo">
                <div className="home-link" onClick={rerouteHome}>
                Review-a-Loo
                </div>
            </div>
            <div className="search-bar-container">
                <Autocomplete
                    className="search-bar"
                    style={{}}
                    onPlaceSelected={(place) => {
                        if (place.geometry) {
                            setLongitude(place.geometry.location.lng())
                            setLatitude(place.geometry.location.lat())
                            searchRegion()
                            console.log(longitude)
                            console.log(latitude)
                        }
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