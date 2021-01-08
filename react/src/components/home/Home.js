import React from 'react';
import BusinessCard from './BusinessCard';
import './home.css';
import Welcome from './Welcome';

const Home = ({businesses, setBusiness}) => {

    console.log(businesses)
    return (
        <div className="home-main-container">
            <div className="home-map-container">
                <div className="home-map-header">Map</div>
            </div>
            <div className="home-business-container">
                <div className="home-business-header">Restrooms</div>
                {businesses? businesses.map((business,idx) => (
                    <BusinessCard key={idx} business={business} setBusiness={setBusiness}/>
                )) 
                :
                <Welcome />
                }
            </div>
        </div>
    );
};


export default Home;