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
    function clickSizingButton(event){
        navigate('/InstructionsPage/Sizing');
    }
    function clickRotationButton(event){
        navigate('/InstructionsPage/Rotation');
    }
    function clickSupportButton(event){
        navigate('/InstructionsPage/SupportFeatures');
    }
    function clickColorsButton(event){
        navigate('/InstructionsPage/Color');
    }
    function clickLighButton(event){
        navigate('/InstructionsPage/Lighting');
    }
    function clickMainMenuButton(event){
        navigate('/StartPage');
    }
    

    return (
    <div class="instructMainPage">
        <div class="mainMenuButton" type="button" onClick={clickMainMenuButton}>MAIN MENU</div>
        <div class="containerOuter">
            <div class="containerInner">
                <nav>

                    <div class="tabButton" type="button" onClick={clickGetStartButton}>GETTING STARTED</div>
                    <div class="tabButton" type="button" onClick={clickShapeButton}>SHAPES</div>
                    <div class="tabButton" type="button" onClick={clickSizingButton}>SIZING</div>
                    <div class="tabButton" type="button" onClick={clickRotationButton}>ROTATION</div>
                    <div class="tabButton" type="button" onClick={clickColorsButton}>COLOR</div>
                    <div class="tabButton" type="button" onClick={clickLighButton}>LIGHTING</div>
                    <div class="tabButton" type="button" onClick={clickSupportButton}>SUPPORT FEATURES</div>
                </nav>
        
            </div>
        </div>
        <Outlet/>    
        
    </div>
    
    );
}