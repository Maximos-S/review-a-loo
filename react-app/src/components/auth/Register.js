import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './register.css'

const Register = () => {
    const {setAuthenticated, authenticated} = useContext(UserContext)
    return (
        <div className="register-container">
            <div className="login-form-container">
                <LoginForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            </div>
            <div className="sign-up-form-container">
                <SignUpForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            </div>
        </div>
    );
};


export default Register;