import React, {useEffect,useContext,} from 'react';
import {useParams} from 'react-router-dom'
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import { getBusiness } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './userProfile.css'
import ReviewCard from '../businessprofile/ReviewCard';
import Map from '../home/Map'
import { Stack, Button } from '@chakra-ui/react';
import { getUser } from '../../services/users';

const UserProfile = () => {
    const {userId} = useParams();
    const {setMapCoordinates, reviews, userProfile, setUserProfile, authenticated, user, business, setBusiness, setReviews,} = useContext(UserContext)

    useEffect( () => {
        (async () => {
            if (!userProfile) {
                const res = await getUser(userId)
                console.log("res",res)
                setUserProfile(res)
                setReviews(res.reviews)
            } else {
            }
        })()
        console.log("user prof", userProfile)
        return () => {
            setUserProfile(false)
            setReviews(false)
        }
    },[]);

    const rerouteYelpProfile = (e) => {
        e.preventDefault()
        window.location.href = business.yelpUrl
    }

    return (
        <div className="user-page-container">
            <div className="user-profile-container">
                <div>{userProfile.username}</div>
            </div>
            <div className="business-profile-body">
                <div className="user-reviews-container">
                    {business.reviews && business.reviews[0] ? reviews.map((review, idx)=> (
                        <ReviewCard key={idx} review={review} />
                        ))
                        :
                        <div className="first-review">Be the first to review their bathroom!</div>
                    }
                </div>
                <div className="review-map-wrapper">
                </div>
            </div>
        </div>
    );
};

export default UserProfile;