import React, {useState, useEffect, useContext, } from 'react';
import {useHistory} from 'react-router-dom'
import {GoogleMap, LoadScript, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { ImDroplet } from 'react-icons/im';
import mapStyle from './mapStyle'
import './map.css'
import { UserContext } from '../context/UserContext';
import Animista, {AnimistaTypes} from 'react-animista';


const Map = ({marks,}) => {

    const [center, setCenter] = useState(null);
    const [markers, setMarkers] = useState(null)
    const [infoWindowId, setInfoWindowId] = useState(null)

    const {mapCoordinates, setMapCoordinates, businesses, business, setBusiness, setReviews} = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        if (mapCoordinates) {
            setCenter(mapCoordinates)
        }
        return () => {
        }
    }, [businesses]);

    // useEffect(() => {
    //     getLocation()
    // }, []);

//     function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setCenter(pos)
//         }, (err) => {
//         })
//     } else {
//       alert("Try another browser for geolocation services")
//     }
//   }


  const { isLoaded } = useJsApiLoader({
    id: '425be5fec40b00f2',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

    return isLoaded ? (
        <Animista type={AnimistaTypes.SCALE_UP_LEFT} className="map-container">
            <GoogleMap
                options={{
                    styles: mapStyle,
                }}
                onClick={() => setInfoWindowId(null)}
                mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                    margin: "0px",
                }}
                center={center}
                zoom={12}
                onUnmount={map => {
                    setInfoWindowId(null)
                }}
            >
                {marks.map((business, idx) => {
                    return (
                    <Marker onClick={() => {setInfoWindowId(business.id)}} key={idx} position={{"lat": business.lat, "lng": business.lng}}>
                            {infoWindowId === business.id && <InfoWindow position={{"lat": business.lat, "lng": business.lng}}>
                                <div  className="info-window" onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setBusiness(business)
                                        setReviews(business.reviews)
                                        history.push(`/business/${business.id}`)
                                    }
                                }>
                                    {business.name}
                                </div>
                            </InfoWindow>
                            }
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