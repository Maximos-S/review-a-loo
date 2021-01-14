import { Button } from '@chakra-ui/react';
import React, {useContext, } from 'react';
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import Animista, {AnimistaTypes} from 'react-animista'


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
    const rerouteYelpProfile = (e) => {
        e.preventDefault()
        window.location.href = business.yelpUrl
    }

    return (
        <Animista  type={AnimistaTypes.SCALE_UP_RIGHT} >
        <div className="business-card-container">

            <div className="business-image-container">
                {business.image ?
                <img onClick={rerouteBusinessProfile} className="business-image" src={business.image} alt="business"/>
                :
                <div onClick={rerouteBusinessProfile} className="business-no-image"></div>
                }
            </div>
            <div className="card-header" onClick={rerouteBusinessProfile}>{business.name}</div>
            {business.starAvg?
            <div className="card-stars">
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
            </div>
            :
            <div className="card-stars"> No reviews yet</div>
            }
            <div className="create-button">
                <Button   color="#472820" colorScheme="yellow" id="button-override" onClick={rerouteBusinessProfile}>Leave a Review</Button>
            </div>
            <div className="yelp-link">
                <Button   color="#472820" colorScheme="yellow" id="button-override" onClick={rerouteYelpProfile}>Yelp Link</Button>
            </div>
            <div className="business-info">
                <div>{business.displayAddress}</div>
                {business.reviews[0] ?
                    <div className="card-review-container">
                        <div className="card-review-title">{business.reviews[0].title}</div>
                        <div className="card-review-content">{business.reviews[0].content}</div>
                    </div>
                    :
                    <div>No Reviews Yet</div>
                }
            </div>
            <div className="business-card-shadow" ></div>
        </div>
        </Animista>
    );
};


export default BusinessCard;