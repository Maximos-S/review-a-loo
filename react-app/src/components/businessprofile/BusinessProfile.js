import React, {useEffect,useContext,} from 'react';
import {useParams} from 'react-router-dom'
import Rating from 'react-rating'
import { ImDroplet } from 'react-icons/im';
import { getBusiness } from '../../services/businesses';
import { UserContext } from '../context/UserContext';
import './businessProfile.css'
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import Map from '../home/Map'
import { Stack, Button } from '@chakra-ui/react';

const BusinessProfile = () => {
    const {businessId} = useParams();
    const {setMapCoordinates, reviews, user, authenticated, business, setBusiness, setReviews,} = useContext(UserContext)

    useEffect( () => {
        (async () => {
            if (!business) {
                const res = await getBusiness(businessId)
                setBusiness(res.business)
                setReviews(res.business.reviews)
            } else {
                setReviews(business.reviews)
                setMapCoordinates({"lat": business.lat, "lng": business.lng})
            }
        })()
        return () => {
        }
    },[]);

    const rerouteYelpProfile = (e) => {
        e.preventDefault()
        window.location.href = business.yelpUrl
    }

    return (
        <div className="profile-container">
            {business && 
            <> 
            <div className="header-container">
                { business.image ?
                    <img className="business-image-header" src={business.image} alt="business" /> 
                    :
                    <div className="business-no-image-header">No Image</div>
                }
                <div className="business-header-title">{business.name}</div>
                <Stack className="business-header-info">
                    <div>{business.displayAddress}</div>
                    <div>{business.phone}</div>
                    <Button   color="#472820" colorScheme="yellow" id="button-override" onClick={rerouteYelpProfile}>Yelp Link</Button>
                </Stack>
                <div className="profile-star-container">
                    <Rating className="rating"
                    initialRating={business.starAvg}
                    readonly
                    emptySymbol={<ImDroplet className="empty-drop-header"/>}
                    fullSymbol={[<ImDroplet className="one-drop"/>,
                                <ImDroplet className="two-drop"/>,
                                <ImDroplet className="three-drop"/>,
                                <ImDroplet className="four-drop"/>,
                                <ImDroplet className="five-drop"/>,]}
                    />
                </div>
                <div className="profile-header-map">
                    {business && <Map marks={[business]}/>}
                </div>
            </div>
            <div className="business-profile-body">
                <div className="business-reviews-container">
                    {business.reviews && business.reviews[0] ? reviews.map((review, idx)=> (
                        <ReviewCard key={idx} review={review} />
                        ))
                        :
                        <div className="first-review">Be the first to review their bathroom!</div>
                    }
                </div>
                <div className="review-map-wrapper">
                        {authenticated? 
                        <ReviewForm user={user} />
                        :
                        <div>Login in to leave reviews</div>
                        }
                </div>
            </div>
            </>
            }
        </div>
    );
};

export default BusinessProfile;