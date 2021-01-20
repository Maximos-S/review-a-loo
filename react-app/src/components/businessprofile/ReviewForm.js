import React, {useState,useContext,useEffect,} from 'react';
import {Stack, Input, Button, Textarea,} from '@chakra-ui/react'
import Rating from 'react-rating'
import {ImDroplet} from 'react-icons/im'
import {createReview, patchReview} from '../../services/businesses'
import './reviewForm.css'
import {authenticate} from '../../services/auth'
import { UserContext } from '../context/UserContext';

const ReviewForm = () => {
    const [stars, setStars] = useState(0)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const {setEditReview, editReview, setReviews, setUser, user, business, setBusiness, setBusinesses, businesses, setAuthenticated} = useContext(UserContext)
    
    useEffect(() => {
        (async() => {
            const user = await authenticate();
            if (!user.errors) {
                setUser(user)
                setAuthenticated(true);
            }
        })();
        return () => {
        }
    }, []);

    useEffect(() => {
        if (editReview) {
            setStars(editReview.stars)
            setTitle(editReview.title)
            setContent(editReview.content)
        } else {
            setStars(0)
            setTitle("")
            setContent("")
        }
        return () => {
            if(editReview) {
                setEditReview(false)
                // setBusiness(false)
                // setReviews(false)
            }
        }
    }, [editReview]);
    
    const submitReview = async (e) => {
        console.log("submit review")
        e.preventDefault()
        setErrors([])

        if (title && content && stars && user) {
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

            if (res.errors) {
                setErrors(user.errors);
                return
            } 
            
            let updatedBusinesses;
            if (businesses) {
                updatedBusinesses = businesses.map( bznz => {
                    if (bznz.id === res.business.id) {
                        return res.business
                    }
                    return bznz
                })
                setBusinesses(updatedBusinesses)
            }

            setReviews(res.business.reviews)
            setBusiness(res.business)
            setEditReview(false)
        } else {
            setErrors(["All fields must be filled out"])
        }

    }

    const updateRating = (rate) => {
        setStars(rate)
    }
  
    
    return (
        <div className="review-form">
            <Stack>
                {errors.map((error) => (
                <div>{error}</div>
                ))}
            </Stack>
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
                <Input backgroundColor="#f3f0e3" color="#472820" className="title-input" variant="filled" placeholder={editReview ? editReview.title : "Title"} value={title} onChange={e => setTitle(e.target.value)}/>
                <Textarea backgroundColor="#f3f0e3" className="content-input" variant="filled" placeholder="Content" value={content} onChange={e => setContent(e.target.value)}/>
                <Button color="#472820" colorScheme="yellow" onClick={submitReview} >Submit</Button>
            </Stack>
        </div>
    );
};


export default ReviewForm;