import React, { useEffect, useState, useContext, } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Autocomplete from 'react-google-autocomplete';
import {searchLocation} from '../../services/businesses'
import './navBar.css'
import { Button, HStack } from '@chakra-ui/react';
import {FaMapMarkerAlt} from 'react-icons/fa'
import { UserContext } from '../context/UserContext';

const NavBar = () => {
    const [onRegister, setOnRegister] = useState(false)
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")

    const {setAuthenticated, authenticated, setUser, user, setBusinesses} = useContext(UserContext)
    // const context = useContext(UserContext)


    let history = useHistory()
    let location = useLocation()
    useEffect(() => {
        // console.log("contexxxxt", setUser)
        if (location.pathname.endsWith("/register")) {
            setOnRegister(true)
        } else {
            setOnRegister(false)
        }
        return () => {
        }
        
    }, [location]);

    const checkForReroute = () => {
        if (location.pathname != "/") {
            history.push("/")
        }
    }

    const searchRegion = async (lat,lng) => {
        checkForReroute()
        setLongitude(lng)
        setLatitude(lat)
        let res = await searchLocation(lat, lng);

        setBusinesses(res.result)
        return
    }

    const searchNearMe = async () => {
        // const locationData = new FormData()
        checkForReroute()
        let lat;
        let lng;

        navigator.geolocation.getCurrentPosition(async (position)=> {
            lat = position.coords.latitude
            lng = position.coords.longitude
            setLatitude(lat)
            setLongitude(lng)
            let res = await searchLocation(lat, lng);
            // console.log(user)
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
                <HStack>
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
                    <Button colorScheme="yellow"onClick={searchNearMe}><FaMapMarkerAlt /></Button>
                </HStack>
            </div>
            <div className="user-buttons">
            {authenticated?
            <>
                <LogoutButton setAuthenticated={setAuthenticated} setUser={setUser} />
            </>
            :
            <>
                {!onRegister && <Button className="nav-button" colorScheme="yellow" onClick={rerouteRegister}>Register</Button>}
            </>
            }
            </div>
        </nav>
    );
}

export default NavBar;