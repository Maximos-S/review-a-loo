import React, {useEffect,useContext,} from 'react';
import {useParams} from 'react-router-dom'
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import { getBusiness } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './businessProfile.css'
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const BusinessProfile = () => {
    const {businessId} = useParams();
    const {reviews, user, authenticated, business, setBusiness, setReviews} = useContext(UserContext)

    useEffect(async () => {
        console.log("usee effect")
        if (!business) {
            console.log("not business")
           const res = await getBusiness(businessId)
           console.log("reeessss", res.business.starAvg)
           setBusiness(res.business)
           setReviews(res.business.reviews)
        }
        return () => {
        }
    }, []);

    return (
        <div className="profile-container">
            <div className="header-container">
                <img className="business-image-header" src={business.image} alt="business" />
                <div>{business.name}</div>
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
                <div className="review-form-container">
                    {authenticated? 
                    <ReviewForm user={user} />
                    :
                    <div>Login in to leave reviews</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;