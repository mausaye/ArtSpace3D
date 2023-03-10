import './StartPage.css';
import {useNavigate} from 'react-router-dom';


export default function MainMenuRoot() {
    const navigate = useNavigate();

    function clickStartButton(event){
       navigate('/EnvironmentCreationPage');
    }
    function clickInstructionsButton(event){
        navigate('/InstructionsPage/GettingStarted');
    }

    return (
        <div class='main-menu'>
            /*<div class="start-button" type="button" onClick={clickStartButton}>START</div> */
            <div class="instruction-button" type="button" onClick={clickInstructionsButton}>INSTRUCTIONS</div>
        </div>
    );
}