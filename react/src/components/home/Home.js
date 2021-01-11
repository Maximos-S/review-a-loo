import React, {useContext,} from 'react';
import { UserContext } from '../context/UserContext';
import BusinessCard from './BusinessCard';
import './home.css';
import Welcome from './Welcome';

const Home = () => {
    const {businesses,} = useContext(UserContext)
    console.log(businesses)
    return (
        <div className="home-main-container">
            <div className="home-map-container">
                <div className="home-map-header">Map</div>
            </div>
            <div className="home-business-container">
                {businesses? businesses.map((business,idx) => (
                    <BusinessCard key={idx} business={business}/>
                )) 
                :
                <Welcome />
                }
            </div>
        </div>
    );
};


export default Home;