import { HStack, IconButton } from '@chakra-ui/react';
import React, {useContext,} from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import { FaToilet } from 'react-icons/fa';
import { ImDroplet } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';
import Rating from 'react-rating'
import { deleteReview } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './reviewCard.css'
import { getUser } from '../../services/users';

const ReviewCard = ({review}) => {

    const {user, setUserProfile, editReview, setEditReview, setBusiness, setReviews, business, businesses, setBusinesses} = useContext(UserContext)

    let history = useHistory()
    let location = useLocation()

    const editReviewSetter = () => {
        console.log("yesss", location.pathname)
        if (location.pathname.startsWith("/users/")) {
            setEditReview(review)
            history.push(`/business/${review.businessId}`)

        }
        setEditReview(review)
    }

    const destroyReview = async () => {
        const res = await deleteReview(review.id, business.id)
        let updatedBusinesses;
        if (businesses) {
            updatedBusinesses = businesses.map( bznz => {
                if (bznz.id === res.business.id) {
                    return res.business
                } else {
                    return bznz
                }
            })
            setBusinesses(updatedBusinesses)
        }
        setReviews(res.business.reviews)
        setBusiness(res.business)
        if (editReview && editReview.id === review.id){
            setEditReview(false)
        }

    }

    const rerouteUser = async () => {
        const res = await getUser(review.user.id)
        setUserProfile(res)
        setReviews(res.reviews)
        history.push(`/users/${review.user.id}`)
    }
    const rerouteBusiness = async () => {
        if (location.pathname.startsWith("/users/")) {

            history.push(`/business/${review.businessId}`)
        }
    }

    return (
        <div className="review-border">
        <div className="review-container">
                <div className="review-user">
                    <div className="review-user-title" onClick={rerouteUser}>
                        {review.user.username}
                    </div>
                </div>
                <div className="review-title">
                    {review.title}
                </div>
            <div className="star-container">
                <div>

                    <Rating 
                        initialRating={review.stars}
                        readonly
                        emptySymbol={<ImDroplet className="empty-star"/>}
                        fullSymbol={[<ImDroplet className="one-star"/>,
                        <ImDroplet className="two-star"/>,
                        <ImDroplet className="three-star"/>,
                        <ImDroplet className="four-star"/>,
                        <ImDroplet className="five-star"/>,]}
                        />
                </div>
            </div>
            <div className="review-card-buttons">
                {user.id === review.userId && 
                <HStack >
                    <IconButton  color="#472820" colorScheme="yellow" title="edit"  aria-label="Search database" onClick={editReviewSetter} icon={<MdEdit className="edit"/>} />
                    <IconButton  color="#472820" colorScheme="yellow" title="delete"  aria-label="Search database" onClick={destroyReview} icon={<FaToilet className="edit"/>} />
                </HStack>
                }
            </div>
            <div className="review-business" onClick={rerouteBusiness}>
                <h3 className="review-business-title">
                    {review.business.name}
                </h3>
            </div>
            <div className="review-content">
                    {review.content}
            </div>
        </div>
        </div>
    );
};


export default ReviewCard;