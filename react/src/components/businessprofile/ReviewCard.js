import { IconButton } from '@chakra-ui/react';
import React, {useContext,useEffect,} from 'react';
import { ImDroplet } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';
import Rating from 'react-rating'
import { UserContext } from '../context/UserContext';
import './reviewCard.css'

const ReviewCard = ({review}) => {
    const {user, setEditReview, setBusiness, setReviews} = useContext(UserContext)

    useEffect(() => {
        return () => {
            setEditReview(false)
            setBusiness(false)
            setReviews(false)
        }
    }, []);

    const editReview = () => {
        setEditReview(review)
    }
    return (
        <div className="review-container">
            <div className="star-container">
                <div className="review-title">
                    {review.title}
                </div>
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
                    {user.id === review.userId && <IconButton aria-label="Search database" onClick={editReview} icon={<MdEdit className="edit"/>} />
                    }
                </div>
            </div>
            <div className="review-content">
                    {review.content}
            </div>
        </div>
    );
};


export default ReviewCard;