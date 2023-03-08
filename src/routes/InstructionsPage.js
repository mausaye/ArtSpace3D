import React from 'react';
import './InstructionsPage.css';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export default function InstructionsPage() {
    const navigate = useNavigate();

    function clickGetStartButton(event){
        navigate('/InstructionsPage/GettingStarted');
    }
    function clickShapeButton(event){
        navigate('/InstructionsPage/Shapes');
    }
    function clickColorButton(event){
        navigate('/InstructionsPage/Color');
    }
    function clickBrightButton(event){
        navigate('/InstructionsPage/Brightness');
    }
    function clickSizeButton(event){
        navigate('/InstructionsPage/Sizing');
    }
    function clickRotateButton(event){
        navigate('/InstructionsPage/Rotation');
    }
    function clickMainMenuButton(event){
        navigate('/');
    }
    

    return (
    <div class="instructMainPage">
        <div class="mainMenuButton" type="button" onClick={clickMainMenuButton}>MAIN MENU</div>
        <div class="containerOuter">
            <div class="containerInner">
                <nav>

                    <div class="tabButton" type="button" onClick={clickGetStartButton}>GETTING STARTED</div>
                    <div class="tabButton" type="button" onClick={clickShapeButton}>SHAPE</div>
                    <div class="tabButton" type="button" onClick={clickColorButton}>COLOR</div>
                    <div class="tabButton" type="button" onClick={clickBrightButton}>BRIGHTNESS</div>
                    <div class="tabButton" type="button" onClick={clickSizeButton}>SIZING</div>
                    <div class="tabButton" type="button" onClick={clickRotateButton}>ROTATION</div>
                </nav>
        
            </div>
        </div>
        <Outlet/>    
        
    </div>
    
    );
}