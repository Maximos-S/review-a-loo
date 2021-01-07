import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Autocomplete from 'react-google-autocomplete';
import {searchLocation} from '../services/businesses'
import './navBar.css'

const NavBar = ({ setAuthenticated, authenticated, setUser, user, setBusinesses }) => {
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


    const searchRegion = async (lat,lng) => {
        setLongitude(lng)
        setLatitude(lat)
        let res = await searchLocation(lat, lng);
        console.log(res.result)
        setBusinesses(res.result)
        return
    }

    const searchNearMe = async () => {
        // const locationData = new FormData()
        let lat;
        let lng;

        navigator.geolocation.getCurrentPosition(async (position)=> {
            lat = position.coords.latitude
            lng = position.coords.longitude
            setLatitude(lat)
            setLongitude(lng)
            let res = await searchLocation(lat, lng);
            console.log(res.result)
            setBusinesses(res.result) 
        }, () => ("Your location is not supported by your browser"))

    }

    const rerouteHome = () => {
        history.push("/")
    }

    const rerouteRegister = () => {
        history.push("/register")
        
    }

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
                            const lat = place.geometry.location.lat()
                            const lng = place.geometry.location.lng()
                            searchRegion(lat, lng)
                        }
                    }}
                    types={['(cities)']}
                    componentRestrictions={{country: "usa"}}
                />
                <button onClick={searchNearMe}>Search Near Me</button>
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