import React, {useState} from 'react';
import { Stack, Button, Input, Textarea } from '@chakra-ui/react';
import { editUser } from '../../services/users';

const UserForm = ({userProfile, setUserProfile, setEditUser}) => {
    const [errors, setErrors] = useState([])
    const [username, setUserName] = useState(userProfile.username)
    const [image, setImage] = useState("")
    const [bio, setBio] = useState(userProfile.bio)
    const [isLoading,setIsLoading] = useState(false)

    const submitUserEdit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log("success",isLoading)
        const data = new FormData();
        data.append("id", userProfile.id)
        data.append("username", username)
        data.append("image", image)
        data.append("bio", bio)
        const res = await editUser(data, userProfile.id)
        if (res.errors) {
            setErrors(res.errors)
            setIsLoading(false)
        } else {
            setUserProfile(res)
            setIsLoading(false)
        }
        console.log("success after set",isLoading)


    }

    const updateImage = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div className="review-form">
            <Stack>
                {errors.map((error) => (
                <div>{error}</div>
                ))}
            </Stack>
            <Stack>
                <div className="review-form-title">Edit Your Profile</div>
                
                <Input type="text" backgroundColor="#f3f0e3" color="#472820" 
                    className="title-input"
                    variant="filled" placeholder="Username" 
                    value={username} 
                    onChange={e => setUserName(e.target.value)}
                />
                <Input type="file" backgroundColor="#f3f0e3" color="#472820" 
                    className="file-input" 
                    variant="filled"
                    onChange={updateImage}
                />
                <Textarea backgroundColor="#f3f0e3" 
                    className="content-input" variant="filled" 
                    placeholder="Biography"
                    height="200px"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />
                <Button color="#472820" colorScheme="yellow" onClick={submitUserEdit} isLoading={isLoading}>Submit</Button>
                <Button color="#472820" colorScheme="yellow" onClick={e => setEditUser(false)}>Cancel</Button>
            </Stack>
        </div>
    );
};

export default UserForm;