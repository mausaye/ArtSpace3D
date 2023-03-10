import './MainMenuRoot.css';
import {useNavigate} from 'react-router-dom';
import Render from '../ArtSpaceApplication/ShapeRenderer'
import App from '../App';


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
            <div class="buttonOne" type="button" onClick={clickStartButton}>START</div>
            <div class="buttonTwo" type="button" onClick={clickInstructionsButton}>INSTRUCTIONS</div>
        </div>
    );
}
