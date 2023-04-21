
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import StartPage from './StartPage'
import validator from "validator";

export default function SignUp() {
    const [message, setMessage] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showConstraints, setShowConstraints] = useState(false);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@#]/.test(password);
    const isLongEnough = password.length >= 8;

    const validateEmail = (e) => {
        const email = e.target.value;

        if (validator.isEmail(email)) {
            setErrorEmail(null)
            setEmail(email);
        } else {
            setErrorEmail("This is not a valid email");
        }
    };

    const validatePassword = (e) => {
        setPassword(e.target.value);

    };

    const handleFocus = () => {
        setShowConstraints(true);
    };

    const handleBlur = () => {
        setShowConstraints(false);
    };
    const constraints = [
        { label: 'At least one uppercase letter', satisfied: hasUppercase },
        { label: 'At least one lowercase letter', satisfied: hasLowercase },
        { label: 'At least one number', satisfied: hasNumber },
        { label: 'At least one special character', satisfied: hasSpecialChar },
        { label: 'At least 8 characters long', satisfied: isLongEnough },
    ];


    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            firstName,
            lastName,
            email,
            password,
        }

        try {
            await fetch("http://localhost:5001/api/users/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
        } catch (error) {
            window.alert(error);
            return;
        };

        navigate('/StartPage');
    };
    return (
        <div class="login">
            <div class="heading">
                Sign Up
            </div>

            <div class="login-container">
                <form class="login-form" onSubmit={handleSubmit}>
                    <div class="signup-content" id="firstname">
                        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div class="signup-content" id="lastname">
                        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <div class="signup-content" id="email">
                        <input type="email" placeholder="Enter email" onChange={(e) => validateEmail(e)} />
                        {errorEmail &&
                            <div style={{ color: 'red' }} class="errorEmail">
                                {errorEmail}
                            </div>}
                    </div>

                    <div class="signup-content" id="password">
                        <input type="password" placeholder="Enter password" onChange={validatePassword} onFocus={handleFocus} onBlur={handleBlur} />
                        {showConstraints && (
                            <div class="constraint">
                                {constraints.map((constraint, index) => (
                                    <div key={index} style={{ color: constraint.satisfied ? 'green' : 'red' }}>
                                        {constraint.satisfied ? '✔' : '❌'} {constraint.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div class="signup-submit" type="button" onClick={handleSubmit}> SIGN UP </div>
                </form>
            </div>
        </div>
    )
}