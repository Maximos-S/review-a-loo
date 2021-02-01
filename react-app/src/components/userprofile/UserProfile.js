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
    const {reviews, userProfile, setUserProfile, authenticated, user, business, setBusiness, setReviews,} = useContext(UserContext)

    useEffect( () => {
        (async () => {
            if (!userProfile) {
                const res = await getUser(userId)
                setUserProfile(res)
                setReviews(res.reviews)
            } else {
            }
        })()

        return () => {
            setUserProfile(false)
            setReviews(false)
        }
    },[]);

    const rerouteEditUser = () => {
        setEditUser(true)
    }



    return (
        <>
        {
            userProfile ?
        <div className="user-page-container">
            <div className="user-profile-container">
                <img className="profile-image" src={userProfile.img_url} alt="profile" />
                <Stack>
                    <div className="profile-username">{userProfile.username}
                    </div>
                    <div>{userProfile.email}</div>
                    <div>{userProfile.bio}</div>
                </Stack>
                    {user.id == userId && userId != 1 &&
                        <IconButton  color="#472820" colorScheme="yellow" title="edit"  aria-label="Search database" onClick={rerouteEditUser} icon={<MdEdit className="edit"/>} />
                    }
            </div>
            <div className="business-profile-body">
                <div className="user-reviews-container">
                    {editUser ?  
                        <UserForm userProfile={userProfile} setUserProfile={setUserProfile} setEditUser={setEditUser}/>
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
        :
        <div>Loading...</div>
        }
        </>
    );
};

export default UserProfile;