import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import { useState } from "react";
import validator from "validator";

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();

        navigate('/StartPage');
    };

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const validateEmail = (e) => {
        var email = e.target.value;

        if (validator.isEmail(email)) {
            setMessage("Thank you");
            setError(null)
            setEmail(email);
        } else {
            setError("Please, enter valid Email!");
        }
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
            <div class="login-heading">
                Log In
            </div>

            <div class="login-container">
                <form class="login-form" onSubmit={handleSubmit}>
                    <div class="login-content">
                        <input type="email" placeholder="Enter email" onChange={(e) => validateEmail(e)} />
                        {error &&
                            <div style={{ color: 'red' }} class="error">
                                {error}
                            </div>}
                    </div>

                    <div class="login-content">
                        <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <div class="login-submit" type="button" onClick={onSubmit}> LOG IN </div>
                    </div>
                </form>
            </div>
        </div>
    )
}