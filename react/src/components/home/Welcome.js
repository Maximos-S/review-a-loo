import React from 'react';
import './welcome.css'

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-header">  
                Welcome to Review-a-Loo. Search a location to get started!
            </div>
            <p>
                Review a loo is your hub for the scoop on the poop! Don't know your city as well as George Costanza?
                No problem! We have all the dirty deets right here.
            </p>
        </div>
    );
};


export default Welcome;