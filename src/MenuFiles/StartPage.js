import './StartPage.css';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

export default function MainMenuRoot() {
    const navigate = useNavigate();
    const loginUser = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!loginUser) {
            navigate('/Login');
        }
    }, [loginUser, navigate]);


    function clickStartButton(event){
       navigate('/EnvironmentCreationPage');
    }
    function clickInstructionsButton(event){
        navigate('/InstructionsPage/GettingStarted');
    }

    function clickLogIn(event){
        navigate('/');
    }

    return (
        <div class='main-menu'>
            <div class="start-button" type="button" onClick={clickStartButton}>START</div>
            <div class="instruction-button" type="button" onClick={clickInstructionsButton}>INSTRUCTIONS</div>
            <div class="logout-button" type="button" onClick={clickLogIn}>LOG OUT</div>
        </div>
    );
}