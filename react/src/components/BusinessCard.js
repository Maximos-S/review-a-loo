import React from 'react';
import './businessCard.css'


const BusinessCard = ({business}) => {
    return (
        <div className="business-card-container">
            <div className="business-image-container">
                <img className="business-image" src={business.image_url} alt="business"/>
            </div>
            <div className="business-info-container">
                <div className="business-title">
                    <div>{business.name}</div>
                </div>
                <div className="business-info">
                    <div>{business.display_address}</div>
                    <div>{business.display_phone}</div>
                    <a href={business.url}>Yelp Link</a>
                </div>
            </div>
        </div>
    );
};


export default BusinessCard;