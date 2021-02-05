import React, { useEffect, useState, useContext, } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Autocomplete from 'react-google-autocomplete';
import {searchLocation} from '../../services/businesses'
import './navBar.css'
import { Button, HStack } from '@chakra-ui/react';
import {FaMapMarkerAlt, FaUserCircle} from 'react-icons/fa'
import { UserContext } from '../context/UserContext';
import navWave from '../../static/wave.svg'
import logo from '../../static/logo.svg'

const NavBar = () => {
    const [onRegister, setOnRegister] = useState(false)
    // const [longitude, setLongitude] = useState("")
    // const [latitude, setLatitude] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {setAuthenticated, authenticated, setUser, user, setBusinesses, setMapCoordinates} = useContext(UserContext)
    // const context = useContext(UserContext)


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

    const checkForReroute = () => {
        if (location.pathname !== "/") {
            history.push("/")
        }
    }

    const searchRegion = async (lat,lng) => {
        setIsLoading(!isLoading)
        checkForReroute()
        // setLongitude(lng)
        // setLatitude(lat)
        let res = await searchLocation(lat, lng);
        lat = res.result[0].lat
        lng = res.result[0].lng
        setMapCoordinates({lat, lng})
        
        setBusinesses(res.result)
        setIsLoading(false)
        return
    }

    const searchNearMe = async () => {
        // const locationData = new FormData()
        setIsLoading(!isLoading)
        checkForReroute()
        let lat;
        let lng;
        
        navigator.geolocation.getCurrentPosition(async (position)=> {
            lat = position.coords.latitude
            lng = position.coords.longitude
            let res = await searchLocation(lat, lng);
            if (res.errors) {
                alert(res.errors[0])
                setIsLoading(false)
                return
            }
            lat = res.result[0].lat
            lng = res.result[0].lng
            setMapCoordinates({lat, lng})
            setBusinesses(res.result) 
            setIsLoading(false)
        }, async () => {
            lat = 33.9413375854492
            lng = -83.4702911376953
            let res = await searchLocation(lat, lng);
            if (res.errors) {
                alert(res.errors[0])
                setIsLoading(false)
                return
            }
            lat = res.result[0].lat
            lng = res.result[0].lng
            setMapCoordinates({lat, lng})
            setBusinesses(res.result) 
            setIsLoading(false)
            alert("There was a problem selecting your current location! Here are the results for the developer's home town.")
            })
        
    }

    const rerouteHome = () => {
        history.push("/")
    }

    const rerouteProfile = () => {
        history.push(`/users/${user.id}`)
    }

    const rerouteRegister = () => {
        history.push("/register")
        
    }

    return (
        <div className="nav-bar-wrapper">
            <img className="wave-line" src={navWave} alt=""/>
        <nav className="nav-bar">
                    {/* <div className="wave" ><svg className="wave-svg"viewBox="0 0 500 150" preserveAspectRatio="none"><path className="wave-path" d="M-28.21,75.48 C63.76,143.58 204.85,-2.45 505.64,93.25 L500.00,0.00 L0.00,0.00 Z"></path></svg></div>
                    <div className="wave-line" ><svg className="wave-line-svg"viewBox="0 0 500 150" preserveAspectRatio="none"><path className="wave-line-path" d="M-28.21,75.48 C63.76,143.58 204.85,-2.45 505.64,93.25 L500.00,0.00 L0.00,0.00 Z"></path></svg></div> */}
            <div className="logo">
                <img src={logo} className="home-link" onClick={rerouteHome} />
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
                    <Button   color="#472820" colorScheme="yellow" id="button-override" isLoading={isLoading} onClick={searchNearMe}><FaMapMarkerAlt /></Button>
                </HStack>
            </div>
            <div className="user-buttons">
            {authenticated?
            <>
                <LogoutButton setAuthenticated={setAuthenticated} setUser={setUser} />
                <Button   color="#472820" colorScheme="yellow" id="button-override" onClick={rerouteProfile}><FaUserCircle className="user-icon" /></Button>
            </>
            :
            <>
                {!onRegister && <Button   color="#472820" colorScheme="yellow" id="button-override" className="nav-button"  onClick={rerouteRegister}>Register</Button>}
            </>
            }
            </div>
        </nav>
        </div>
    );
}

export default NavBar;