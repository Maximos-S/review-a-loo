import React from 'react';
import './welcome.css'
import plant from '../../static/plant.svg'

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-header">  
                Welcome to Review-a-Loo
            </div>
            <span className="welcome-subheader">Search a location to get started!</span>
            <p className="about-paragraph">
                Review a loo is your hub for the scoop on the poop! Don't know your city as well as George Costanza?
                No problem! We have all the dirty deets right here.
            </p>
            <div className="accent-div"></div>
            <img className="plant-image" src={plant} alt="plant" />
        </div>
    );
};


export default Welcome;