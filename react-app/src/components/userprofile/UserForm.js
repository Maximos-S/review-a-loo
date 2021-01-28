import React, {useState} from 'react';
import { Stack, Button, Input, Textarea } from '@chakra-ui/react';

const UserForm = () => {
    const [errors, setErrors] = useState([])


    return (
        <div className="review-form">
            <Stack>
                {errors.map((error) => (
                <div>{error}</div>
                ))}
            </Stack>
            <Stack>
                <div className="review-form-title">Edit Your Profile</div>
                
                <Input type="text" backgroundColor="#f3f0e3" color="#472820" className="username-input" variant="filled" placeholder="Username" value={"hello"}/>
                <Input type="file" backgroundColor="#f3f0e3" color="#472820" className="title-input" variant="filled" />
                <Textarea backgroundColor="#f3f0e3" className="content-input" variant="filled" placeholder="Biography"/>
                <Button color="#472820" colorScheme="yellow" >Submit</Button>
            </Stack>
        </div>
    );
};

export default UserForm;