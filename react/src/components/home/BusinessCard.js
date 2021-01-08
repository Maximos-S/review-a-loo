import { Button } from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom'
import './businessCard.css'


const BusinessCard = ({business, setBusiness}) => {

    let history = useHistory()

    const rerouteBusinessProfile = (e) => {
        e.preventDefault()
        setBusiness(business)
        history.push(`/business/${business.id}`)
    }


    return (
        <div className="business-card-container">
            <div className="business-image-container">
                <img className="business-image" src={business.image} alt="business"/>
            </div>
            <div className="business-info-container">
                <div className="business-title">
                    <div>{business.name}</div>
                </div>
                <div>{business.star_avg}</div>
                <div>
                    <Button colorScheme="yellow" onClick={rerouteBusinessProfile}>Leave a Review</Button>
                </div>
                <div className="business-info">
                    <div>{business.displayAddress}</div>
                    <div>{business.phone}</div>
                    <a href={business.url}>Yelp Link</a>
                </div>
            </div>
        </div>
    );
};


export default BusinessCard;