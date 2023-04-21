import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LogIn.css';
import StartPage from './StartPage'
import { useState } from "react";
import validator from "validator";

export default function LogIn() {
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
        } else {
          setError("Please, enter valid Email!");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const newPerson = {
            email: 'test@gmail.com',
            password: '1234'
          };
        // This will send a post request to update the data in the database.
        await fetch("http://localhost:5001/api/users/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    }
    
    return(
    <div class="login">
        <div class="heading">
            Log In
        </div>

        <div class="login-container">
            <form class="login-form" onSubmit={handleSubmit}>
                <div class ="login-content">
                    <input type="email" placeholder="Enter email" onChange={(e) => validateEmail(e)}/>
                    {error &&
                        <div style={{color: 'red'}} class = "error">
                            {error}
                        </div>}
                </div>

                <div class ="login-content">
                    <input type="password" placeholder="Enter password"/>
                </div>

                <div>
                    <div class="login-submit" type="button" onClick = {onSubmit}> LOG IN </div>
                </div>
            </form>
        </div>
    </div>
    )
}