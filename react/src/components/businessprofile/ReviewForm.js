import React, {useState,useContext,useEffect,} from 'react';
import {Stack, Input, Button, Textarea, IconButton} from '@chakra-ui/react'
import Rating from 'react-rating'
import {ImDroplet} from 'react-icons/im'
import {MdEdit} from 'react-icons/md'
import {createReview, patchReview} from '../../services/businesses'
import './reviewForm.css'
import { UserContext } from '../context/UserContext';

const ReviewForm = () => {
    const [stars, setStars] = useState(0)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const {setEditReview, editReview, setReviews, user, business, setBusiness, setBusinesses, businesses} = useContext(UserContext)
    
    useEffect(() => {
        if (editReview) {
            setStars(editReview.stars)
            setTitle(editReview.title)
            setContent(editReview.content)
        }
        return () => {
        }
    }, [editReview]);
    
    const submitReview = async (e) => {
        e.preventDefault()

        if (title && content && stars) {
            const data = new FormData();
            if (editReview) {
                data.append("reviewId", editReview.id)
            }
            data.append("userId", user.id)
            data.append("businessId", business.id)
            data.append("stars", stars)
            data.append("title", title)
            data.append("content", content)
            setTitle("")
            setContent("")
            setStars(0)
            let res;
            if (editReview) {
                res = await patchReview(data, business.id,)
            } else {
                res = await createReview(data, business.id)
            }

            let updatedBusinesses;
            if (businesses) {
                updatedBusinesses = businesses.map( bznz => {                    if (bznz.id === res.business.id) {
                        return res.business
                    }
                    return bznz
                })
            }
            setBusinesses(updatedBusinesses)

            setReviews(res.business.reviews)
            setBusiness(res.business)
            setEditReview(false)
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
                <Input className="title-input" variant="filled" placeholder="Title" placeholder={editReview ? editReview.title : "Title"}value={title} onChange={e => setTitle(e.target.value)}/>
                <Textarea className="content-input" variant="filled" placeholder="Content" value={content} onChange={e => setContent(e.target.value)}/>
                <Button colorScheme="yellow" onClick={submitReview} >Submit</Button>
            </Stack>
        </div>
    );
};


export default ReviewForm;