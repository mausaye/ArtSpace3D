import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LogIn.css';
import StartPage from './StartPage'


export default function LogIn() {
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
    
        navigate('/StartPage');
      };
    return(
    <div class="login">
        <div class="heading">
            Log In
        </div>

        <div class="login-container">
            <form class="login-form" onSubmit={handleSubmit}>
                <div class ="login-content">
                    <input type="email" placeholder="Enter email"/>
                </div>

                <div class ="login-content">
                    <input type="password" placeholder="Enter password"/>
                </div>

                <div>
                    <button class ="login-submit" type="submit">
                    Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}