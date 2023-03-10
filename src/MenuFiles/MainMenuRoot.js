import './MainMenuRoot.css';
import {useNavigate} from 'react-router-dom';


export default function MainMenuRoot() {
    const navigate = useNavigate();

    /*
    function clickStartButton(event){
       navigate('/EnvironmentCreationPage');
    }*/

    function clickLogIn(event){
        navigate('/LogIn');
    }

    function clickSignUp(event){
        navigate('SignUp');
    }
    

    function clickInstructionsButton(event){
        navigate('/InstructionsPage/GettingStarted');
    }

    return (
        <div class='main-menu'>
            {/*<div class="buttonOne" type="button" onClick={clickStartButton}>START</div> */}
            <div class="buttonOne" type="button" onClick = {clickLogIn}> LOG IN </div>
            <div class="buttonTwo" type="button" onClick={clickSignUp}> SIGN UP</div>
            <div class="buttonThree" type="button" onClick={clickInstructionsButton}>INSTRUCTIONS</div>
        </div>
    );
}
