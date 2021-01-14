import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, LoadScript, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import FaAnchor from "react-icons/lib/fa/anchor"
import mapStyle from './mapStyle'
import './map.css'
import { UserContext } from '../context/UserContext';
import Animista, {AnimistaTypes} from 'react-animista';


const Map = ({marks,}) => {

    const [center, setCenter] = useState(null);
    const [markers, setMarkers] = useState(null)

    const {mapCoordinates, setMapCoordinates, businesses} = useContext(UserContext)

    useEffect(() => {
        if (mapCoordinates) {
            setCenter(mapCoordinates)
        }
        return () => {
        }
    }, [businesses]);

    useEffect(() => {
        getLocation()
    }, []);
    function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos)
        }, (err) => {
        })
    } else {
      alert("Try another browser for geolocation services")
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: '425be5fec40b00f2',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

    return isLoaded ? (
        <Animista type={AnimistaTypes.SCALE_UP_LEFT} className="map-container">
            <GoogleMap
             mapContainerStyle={{
              height: "100%",
              width: "100%",
              margin: "0px",
              
            }}
            center={center}
            zoom={12}
            // onLoad={map => {
            //     const bounds = new window.google.maps.LatLngBounds();
            //     map.fitBounds(bounds);
            // }}
            onUnmount={map => {
                // do your stuff before map is unmounted
            }}
            >
                {marks.map((business, idx) => {
                    return (
                    <Marker key={idx} position={{"lat": business.lat, "lng": business.lng}}>
                        <InfoWindow>
                            <div>
                            <FaAnchor />
                            {" "}
                            Controlled zoom: {12}
                            </div>
                        </InfoWindow>
                    </Marker>
                    )
                })}
            </GoogleMap>
        </Animista>
    )
    :
    <div>Loading...</div>
};


export default Map;