import React, {useEffect,useContext, useState} from 'react';
import {useParams} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import './userProfile.css'
import ReviewCard from '../businessprofile/ReviewCard';
import {  IconButton, Stack } from '@chakra-ui/react';
import { getUser } from '../../services/users';
import { MdEdit } from 'react-icons/md';
import UserForm from './UserForm';

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
        setEditUser(true)
    }



    return (
        <div className="user-page-container">
            <div className="user-profile-container">
                <img className="profile-image" src={userProfile.img_url} alt="profile" />
                <Stack>
                    <div>{userProfile.username}</div>
                    <div>{userProfile.email}</div>
                    <div>{userProfile.bio}</div>
                    <IconButton  color="#472820" colorScheme="yellow" title="edit"  aria-label="Search database" onClick={rerouteEditUser} icon={<MdEdit className="edit"/>} />
                </Stack>
            </div>
            <div className="business-profile-body">
                <div className="user-reviews-container">
                    {editUser ?  
                        <UserForm setEditUser={setEditUser}/>
                    :
                        <>
                        {reviews && reviews[0] ? reviews.map((review, idx)=> (
                            <ReviewCard key={idx} review={review} />
                            ))
                            :
                            <div className="first-review">This user has not left any reviews yet!</div>
                        }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;