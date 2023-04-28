// source: https://www.w3resource.com/javascript/form/email-validation.php for email
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import StartPage from './StartPage'
import SignUp from './SignUp'
import { useState } from "react";

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    const emailBlur = (e) => {
        var email = e.target.value;
        if (email === ''){
            setEmailError('Please enter an email!');
        } else if(!validEmail(email)){
            setEmailError('This is not a valid email!');
        }
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const passwordBlur = (e) => {
        var password = e.target.value;
        if (password === '') {
            setPasswordError('Please enter a password');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();

        navigate('/StartPage');
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const loginUser = {
            email,
            password
        }
        // This will send a post request to update the data in the database.
        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginUser),
            });

            const { status, statusText } = response;

            if (status === 200) {
                const loginUserData = await response.json();
                localStorage.setItem('userInfo', JSON.stringify(loginUserData));
                navigate('/StartPage');
            } else if (status === 401) {
                // api error
                window.alert('Invalid email or password');
            } else {
                // other api error
                window.alert(statusText);
            }
        } catch (error) {
            // network error
            window.alert(error);

        }
    }


    return (
        <div class="login">
            <div class="heading">
                Log In
            </div>

            <div class = "login-container">
                <form class = "login-form" onSubmit = {handleSubmit}>
                    <div class="login-content">
                        <input 
                            type = "email" 
                            placeholder = "Enter email" 
                            onChange = {(e) => handleEmailChange(e)}
                            onBlur = {(e) => emailBlur(e)} />
                            {emailError && 
                                <div class = "emailerror"> {emailError} 
                                </div>}
                    </div>

                    <div class="login-content">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password" 
                            onChange={(e) => handlePasswordChange(e)}
                            onBlur = {(e) => passwordBlur(e)} 
                        />
                        <label class="showPassword">
                                <input
                                    type="checkbox"
                                    checked={(e) => showPassword(e)}
                                    onChange={(e) => handleClickShowPassword(e)}
                                />
                                Show Password
                            </label>
                        {passwordError && 
                            <div class = "passworderror"> {passwordError} 
                            </div>}
                    </div>

                    <div>
                        <div 
                            class="login-submit" 
                            type="button" 
                            onClick={onSubmit}> LOG IN </div>
                    </div>
                </form>
            </div>
        </div>
    )
}