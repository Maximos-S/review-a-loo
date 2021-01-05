import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Register = ({setAuthenticated,authenticated}) => {
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