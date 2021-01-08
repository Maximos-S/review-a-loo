import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Register = () => {
    const {setAuthenticated, authenticated} = useContext(UserContext)
    return (
        <>
            <div className="login-form-container">
                <LoginForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            </div>
            <div className="sign-up-form-container">
                <SignUpForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            </div>
        </>
    );
};


export default Register;