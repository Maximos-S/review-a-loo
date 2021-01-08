import { Button } from '@chakra-ui/react';
import React, {useContext, } from 'react';
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';


import {useHistory} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import './businessCard.css'


const BusinessCard = ({business,}) => {
    const {setBusiness, setReviews} = useContext(UserContext)
    let history = useHistory()

    const rerouteBusinessProfile = (e) => {
        e.preventDefault()
        setBusiness(business)
        setReviews(business.reviews)
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
                {business.starAvg?
                <Rating 
                    initialRating={business.starAvg}
                    readonly
                    emptySymbol={<ImDroplet className="empty-star"/>}
                    fullSymbol={[<ImDroplet className="one-star"/>,
                                <ImDroplet className="two-star"/>,
                                <ImDroplet className="three-star"/>,
                                <ImDroplet className="four-star"/>,
                                <ImDroplet className="five-star"/>,]}
                />
                :
                <div> No reviews yet</div>
                }
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