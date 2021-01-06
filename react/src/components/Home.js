import React from 'react';
import './home.css';

const Home = ({businesses}) => {

    console.log(businesses)
    return (
        <div className="home-main-container">
            <div className="home-map-container">
                <div className="home-map-header">Map</div>
            </div>
            <div className="home-business-container">
                <div className="home-business-header">Restrooms</div>
                {businesses? businesses.map(business => (
                    <div>{business.name}</div>
                )) 
                :
                <div>Please search a location</div>
                }
            </div>
        </div>
    );
};


export default Home;