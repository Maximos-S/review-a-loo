import React from 'react';
import { ImDroplet } from 'react-icons/im';
import Rating from 'react-rating'
import './reviewCard.css'

const ReviewCard = ({review}) => {
    return (
        <div className="review-container">
            <div className="star-container">
                <div className="review-title">
                    {review.title}
                </div>
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
            <div className="review-content">
                    {review.content}
            </div>
        </div>
    );
};


export default ReviewCard;