import React, {useContext,} from 'react';
import { UserContext } from '../context/UserContext';
import BusinessCard from './BusinessCard';
import Map from './Map';
import './home.css';
import Welcome from './Welcome';
import LoginForm from '../auth/LoginForm';
import About from './About';


const Home = () => {
    const {businesses, authenticated} = useContext(UserContext)
    console.log(businesses)
    return (
        <div className="home-main-container">
            <div className="home-map-container">
                <div className="home-map-wrapper">
                        {businesses? 
                            <Map marks={businesses}/>
                        : 
                            <>
                            {authenticated ? 
                                <About />
                            :
                                <LoginForm />
                            }
                            </>
                        }
                </div>
            </div>
            <div className="home-business-container">
                {businesses ? businesses.map((business,idx) => (
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