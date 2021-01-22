import React, {useEffect,useContext, useState} from 'react';
import {useParams} from 'react-router-dom'
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import { getBusiness } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './userProfile.css'
import ReviewCard from '../businessprofile/ReviewCard';
import Map from '../home/Map'
import { Stack, Button, IconButton } from '@chakra-ui/react';
import { getUser } from '../../services/users';
import { MdEdit } from 'react-icons/md';

const UserProfile = () => {
    const {userId} = useParams();
    const [editUser, setEditUser] = useState(false)
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

    const rerouteEditUser = () => {

    }



    return (
        <div className="user-page-container">
            <div className="user-profile-container">
                <div>{userProfile.username}</div>
                <div>{userProfile.email}</div>
                <IconButton  color="#472820" colorScheme="yellow" title="edit"  aria-label="Search database" onClick={rerouteEditUser} icon={<MdEdit className="edit"/>} />
            </div>
            <div className="business-profile-body">
                <div className="user-reviews-container">
                    {reviews && reviews[0] ? reviews.map((review, idx)=> (
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