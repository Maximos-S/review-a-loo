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


    const searchRegion = async () => {
        const regionData = new FormData()
        regionData.append('lat', latitude)
        regionData.append('lng', longitude)
        let res = await searchLocation(latitude, longitude);
        console.log(res.result)
        setBusinesses(res.result)
        return
    }

    const searchNearMe = async () => {
        // const locationData = new FormData()
        let lat;
        let lng;

        await navigator.geolocation.getCurrentPosition((position)=> {
            lat = position.coords.latitude
            lng = position.coords.longitude
            setLatitude(lat)
            setLongitude(lng)
        }, () => ("Your location is not supported by your browser"))

        let res = await searchLocation(latitude, longitude);
        console.log(res.result)
        setBusinesses(res.result) 
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