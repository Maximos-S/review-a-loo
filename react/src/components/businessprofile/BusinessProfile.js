import React, {useEffect,} from 'react';
import {useParams} from 'react-router-dom'
import './businessProfile.css'
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const BusinessProfile = ({user, authenticated, business, setBusiness}) => {
    const {businessId} = useParams();

    useEffect(() => {
        if (!business) {

        }
        return () => {
        }
    }, []);

    return (
        <div className="profile-container">
            <div className="header-container">
                <img className="business-image-header" src={business.image} alt="business" />
            </div>
            <div className="business-profile-body">
                <div className="business-reviews-container">
                    {business.reviews && business.reviews.map((review, idx)=> (
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