
import React,{ useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './SignUp.css';
import StartPage from './StartPage'
import validator from "validator";

export default function SignUp() {
    const [message, setMessage] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);

    const validateEmail = (e) => {
        var email = e.target.value;
    
        if (validator.isEmail(email)) {
          setErrorEmail(null)
        } else {
          setErrorEmail("Please, enter valid Email!");
        }
    };

    const validatePassword = (e) => {
        var password = e.target.value;
        setPassword(password);

        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if (!password.match(lowerCase)) {
            setErrorPassword("Password should contain a lowercase letters");
        } else if (!password.match(upperCase)) {
            setErrorPassword("Password should contain an uppercase letter");
        } else if (!password.match(numbers)) {
            setErrorPassword("Password should contain a number");
        } else if (password.length < 8){
            setErrorPassword("Password should be longer than 8")
        } else {
            setMessage('');
            setErrorPassword(null);
        }
    };


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
                    <input type="email" placeholder="Enter email"  onChange={(e) => validateEmail(e)}/>
                    {errorEmail &&
                        <div style={{color: 'red'}} class = "errorEmail">
                            {errorEmail}
                        </div>}
                </div>

                <div class ="signup-content" id="password">
                    <input type="password" placeholder="Enter password" onChange={(e) => validatePassword(e)} />
                    {errorPassword &&
                        <div style={{color: 'red'}} class = "errorEmail">
                            {errorPassword}
                        </div>}
                </div>

    

                <div class="signup-submit" type="button" > SIGN UP </div>
            </form>
        </div>
    </div>
    )
}