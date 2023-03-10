import React from 'react';
import {useNavigate} from 'react-router-dom';
import './SignUp.css';
import StartPage from './StartPage'


export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
    
        navigate('/StartPage');
      };
    return(
    <div class="login">
        <div class="heading">
            Sign Up
        </div>

        <div class="login-container">
            <form class="login-form" onSubmit={handleSubmit}>
                <div class ="signup-content" id="firstname">
                    <input type="text" placeholder="First Name"/>
                </div>
                <div class ="signup-content" id="lastname">
                    <input type="text" placeholder="Last Name"/>
                </div>

                <div class ="signup-content" id="email">
                    <input type="email" placeholder="Enter email"/>
                </div>

                <div class ="signup-content" id="password">
                    <input type="password" placeholder="Enter password"/>
                </div>

                <div>
                    <button class ="signup-submit" type="submit">
                    Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}