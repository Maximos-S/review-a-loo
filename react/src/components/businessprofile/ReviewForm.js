import React, {useState} from 'react';
import {Stack, Input, Button, Textarea} from '@chakra-ui/react'
import Rating from 'react-rating'
import {ImDroplet} from 'react-icons/im'
import {createReview} from '../../services/businesses'
import './reviewForm.css'

const ReviewForm = () => {
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])

    const submitReview = async (e) => {
        e.preventDefault()
        console.log("yesirskee", title, content, rating)
        if (title && content && rating) {
            const data = new FormData();
            data.append("userId", 1)
            data.append("businessId", 1)
            data.append("stars", rating)
            data.append("title", title)
            data.append("content", content)
            console.log("datatata", data)
            setTitle("")
            setContent("")
            setRating(0)
            const res = await createReview(data, 1)
            console.log(res)
        }

    }

    const updateRating = (rate) => {
        console.log("updaterating")
        setRating(rate)
    }

    const updateTitle = (e) => {
        e.stopPropagation()
        console.log("update title", rating)
        setTitle(e.target.value)
    }
    const updateContent = (e) => {
        e.stopPropagation()
        console.log("update content", rating)
        setContent(e.target.value)
    }

    return (
        <div className="review-form">
            <Stack>
                <Rating className="rating"
                value={rating}
                onChange={updateRating}
                emptySymbol={<ImDroplet className="empty-drop"/>}
                fullSymbol={[<ImDroplet className="one-drop"/>,
                            <ImDroplet className="two-drop"/>,
                            <ImDroplet className="three-drop"/>,
                            <ImDroplet className="four-drop"/>,
                            <ImDroplet className="five-drop"/>,]}
                />
                <Input variant="filled" placeholder="Title" value={title} onChange={updateTitle}/>
                <Textarea variant="filled" placeholder="Content" value={content} onChange={updateContent}/>
                <Button colorScheme="yellow" onClick={submitReview} >Submit</Button>
            </Stack>
        </div>
    );
};


export default ReviewForm;