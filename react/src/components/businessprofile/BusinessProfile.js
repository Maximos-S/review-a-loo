import React, {useEffect,useContext,} from 'react';
import {useParams} from 'react-router-dom'
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import { getBusiness } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './businessProfile.css'
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import Map from '../home/Map'
import { Stack } from '@chakra-ui/react';

const BusinessProfile = () => {
    const {businessId} = useParams();
    const {reviews, user, authenticated, business, setBusiness, setReviews, setEditReview} = useContext(UserContext)

    useEffect(async () => {
        if (!business) {
           const res = await getBusiness(businessId)
           setBusiness(res.business)
           setReviews(res.business.reviews)
        }
        return () => {
        }
    });

    return (
        <div className="profile-container">
            <div className="header-container">
                <img className="business-image-header" src={business.image} alt="business" />
                <Stack className="business-header-info">
                    <div className="business-header-title">{business.name}</div>
                    <div>{business.displayAddress}</div>
                    <div>{business.phone}</div>
                </Stack>
                <Rating className="rating"
                initialRating={business.starAvg}
                readonly
                emptySymbol={<ImDroplet className="empty-drop-header"/>}
                fullSymbol={[<ImDroplet className="one-drop"/>,
                            <ImDroplet className="two-drop"/>,
                            <ImDroplet className="three-drop"/>,
                            <ImDroplet className="four-drop"/>,
                            <ImDroplet className="five-drop"/>,]}
                />
            </div>
            <div className="business-profile-body">
                <div className="business-reviews-container">
                    {business.reviews && reviews.map((review, idx)=> (
                        <ReviewCard key={idx} review={review} />
                        ))}
                </div>
                <div className="review-map-wrapper">
                    <div className="review-form-container">
                        {authenticated? 
                        <ReviewForm user={user} />
                        :
                        <div>Login in to leave reviews</div>
                        }
                    </div>
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;