import React, {useState, useEffect, useContext, } from 'react';
import {useHistory} from 'react-router-dom'
import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import {mapStyle} from './mapStyle'
import './map.css'
import { UserContext } from '../context/UserContext';
import Animista, {AnimistaTypes} from 'react-animista';


const Map = ({marks,}) => {

    const [center, setCenter] = useState(null);
    const [infoWindowId, setInfoWindowId] = useState(null)

    const {mapCoordinates, setMapCoordinates, businesses, setBusiness, setReviews} = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        if (mapCoordinates) {
            setCenter(mapCoordinates)            
        } else {
            setMapCoordinates({"lat": marks[0].lat, "lng": marks[0].lng})
            setCenter({"lat": marks[0].lat, "lng": marks[0].lng})
        }
        return () => {
        }
    }, [businesses, mapCoordinates]);

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



    return center ? (
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
                zoom={10}
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