import React, {useState,useContext} from 'react';
import {Stack, Input, Button, Textarea, IconButton} from '@chakra-ui/react'
import Rating from 'react-rating'
import {ImDroplet} from 'react-icons/im'
import {MdEdit} from 'react-icons/md'
import {createReview} from '../../services/businesses'
import './reviewForm.css'
import { UserContext } from '../context/UserContext';
import EditReviewForm from './EditReviewForm';

const ReviewForm = () => {
    const [stars, setStars] = useState(0)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const {editReview, setReviews, user, business, setBusiness} = useContext(UserContext)
    
    
    const submitReview = async (e) => {
        e.preventDefault()

        if (title && content && stars) {
            const data = new FormData();
            data.append("userId", user.id)
            data.append("businessId", business.id)
            data.append("stars", stars)
            data.append("title", title)
            data.append("content", content)
            console.log("datatata", data)
            setTitle("")
            setContent("")
            setStars(0)
            const res = await createReview(data, business.id)
            setReviews(res.business.reviews)
            setBusiness(res.business)
        }

    }

    const updateRating = (rate) => {
        console.log("starss on lcikc",rate)
        setStars(rate)
        // if (!starsChange) {
        //     setStarsChange(true)
        // } 
        // if (editToggle === "edit-hidden") {
        //     setEditToggle("edit-visible")
        // } 
    }
  
    
    return (
        <div className="review-form">
            <Stack>
                <div className="review-form-title">{editReview? "Edit Your Review": "Create a Review"}</div>
                <div className="drop-container">
                    <Rating className="rating"
                    initialRating={stars}
                    onClick={updateRating}
                    emptySymbol={<ImDroplet className="empty-drop"/>}
                    fullSymbol={[<ImDroplet className="one-drop"/>,
                    <ImDroplet className="two-drop"/>,
                    <ImDroplet className="three-drop"/>,
                    <ImDroplet className="four-drop"/>,
                    <ImDroplet className="five-drop"/>,]}
                    />
                </div>
                <Input variant="filled" placeholder="Title" placeholder={editReview ? editReview.title : "Title"}value={title} onChange={e => setTitle(e.target.value)}/>
                <Textarea variant="filled" placeholder="Content" value={content} onChange={e => setContent(e.target.value)}/>
                <Button colorScheme="yellow" onClick={submitReview} >Submit</Button>
            </Stack>
        </div>
    );
};


export default ReviewForm;