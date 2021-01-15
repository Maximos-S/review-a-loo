import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';

const EditReviewForm = () => {

    const [editReview] = useContext(UserContext)
    return (
        <div>
            edit
        </div>
    );
};


export default EditReviewForm;