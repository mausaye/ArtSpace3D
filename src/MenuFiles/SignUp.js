import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConstraints, setShowConstraints] = useState(false);


    //First Name 
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setFirstNameError('');
    };

    const firstNameBlur = (e) => {
        var firstName = e.target.value;
        if (firstName === '') {
            setFirstNameError('Please enter your first name');
        }
        if (firstName.length < 2){
            setFirstNameError('Please enter a valid first name');
        }
    };
    //Last Name
    const handleLastName = (e) => {
        setFirstName(e.target.value);
        setLastNameError('');
    };

    const lastNameBlur = (e) => {
        var lastname = e.target.value;
        if (lastname === '') {
            setLastNameError('Please enter your last name');
        }
        if (lastname .length < 2){
            setLastNameError('Please enter a valid last name');
        }
    };
    
    //Email
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

    //Password 
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@#]/.test(password);
    const isLongEnough = password.length >= 8;
    const navigate = useNavigate();

    const validatePassword = (e) => {
        setPassword(e.target.value);

    };

    const handleFocus = () => {
        setShowConstraints(true);
    };

    const passwordleBlur = () => {
        setShowConstraints(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const constraints = [
        { label: 'At least one uppercase letter', satisfied: hasUppercase },
        { label: 'At least one lowercase letter', satisfied: hasLowercase },
        { label: 'At least one number', satisfied: hasNumber },
        { label: 'At least one special character', satisfied: hasSpecialChar },
        { label: 'At least 8 characters long', satisfied: isLongEnough },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            firstName,
            lastName,
            email,
            password,
        }

        try {
            const response = await fetch("http://localhost:5001/api/users/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            
            const { status, statusText } = response;

            if (status === 201) {
                const loginUserData = await response.json();
                localStorage.setItem('userInfo', JSON.stringify(loginUserData));
                window.alert('Welcome in!');
                navigate('/StartPage');
            } else if (status === 400) {
                // api error
                window.alert('Email is already used');
            } else {
                // other api error
                window.alert(statusText);
            }
        } catch (error) {
            // network error
            window.alert(error);
            return;
        };
    };

    
    return (
        <div class="signup">
            <div class="signup-heading">
                Sign Up
            </div>

            <div class="login-container">
                <form class="login-form" onSubmit={handleSubmit}>
                    <div class="signup-content" id="firstname">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            onChange={(e) => handleFirstName(e)}
                            onBlur = {(e) => firstNameBlur(e)} />
                            {firstNameError && 
                                <div class = "error"> {firstNameError} 
                                </div>}
                    </div>
                    <div class="signup-content" id="lastname">
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={(e) => handleLastName(e)}
                            onBlur = {(e) => lastNameBlur(e)}/>
                            {lastNameError && 
                                <div class = "error"> {lastNameError} 
                                </div>}
                    </div>

                    <div class="signup-content" id="email">
                        <input 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e) => handleEmailChange(e)}
                            onBlur = {(e) => emailBlur(e)} />
                        {emailError &&
                            <div class="error">
                                {emailError}
                            </div>}
                    </div>

                    <div class="signup-content" id="password">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password" 
                            onChange={(e) => validatePassword(e)} 
                            onFocus={(e) => handleFocus(e)} 
                            onBlur={(e) => passwordleBlur(e)} 
                            />
                            <label class="showPassword">
                                <input
                                    type="checkbox"
                                    checked={(e) => showPassword(e)}
                                    onChange={(e) => handleClickShowPassword(e)}
                                />
                                Show Password
                            </label>
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