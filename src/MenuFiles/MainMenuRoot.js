import './MainMenuRoot.css';
import {useNavigate} from 'react-router-dom';


export default function MainMenuRoot() {
    const navigate = useNavigate();

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
            <div class="title">
                <svg id="AST" width="530" height="222" viewBox="0 0 530 222" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 82.5C36 77.8333 13.8 76 4.99998 106C2.49998 118.667 0.899977 147.2 14.5 160C16.1667 161.667 20.7 164.2 25.5 161C31.5 157 39.5 143 57.5 110.5C69.6667 86.8333 95.8 36.2 103 23C112 6.5 124.5 -11.5 116.5 24C111.667 44.8333 101.3 89.2 98.5 100C96 110.333 89.5 138.2 83.5 167C82 174 79 188.9 79 192.5C79 197 79 205.5 85 197.5" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round"/>
                    <path d="M21.5 101.5C58.1667 100.333 130.6 99.6 127 106" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round"/>
                    <path d="M141 102.5C148.5 89.5 159.9 66.3 145.5 77.5C141.5 80.6667 134.4 89.8 138 101C139.5 104.167 146.7 107.7 163.5 96.5C158.667 109.167 149.9 137.2 153.5 148C154.333 150.833 158.2 153.7 167 142.5C172.667 134.333 185 115.3 189 104.5C197 78.3333 212.2 25.8 209 25C202.667 48.6667 186.9 113.4 174.5 183C172.667 194.167 170.1 214 174.5 204" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M152.5 56.5C199.333 54.3333 292.8 51.3 292 56.5" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round"/>
                    <path d="M355 20.5C356.667 10.3333 346.9 -2.49999 294.5 27.5C285.333 32.8333 264.2 48.3 253 67.5C248.5 75.1667 246.1 92 272.5 98C287.167 102.167 318.4 114.4 326 130C328.667 136.5 329.1 155 309.5 177C305 182 292.2 193.8 277 201C268.667 203.5 254.5 204.8 264.5 190C268.5 183.667 282.1 166.4 304.5 148C316.833 137.667 345.7 114.3 362.5 103.5C363.833 103 366.8 100.3 368 93.5L371 75L346.5 219C349.863 196.107 357.22 152.618 364.647 125.5M364.647 125.5C366.79 117.674 368.939 111.211 371 107C376.333 94.6667 388 74.5 392 92.5C393.265 99.1667 389.565 115.1 364.647 125.5ZM364.647 125.5C362.765 127 358.2 130 355 130" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M424 95.5C420.5 90.3333 411.1 85.9 401.5 109.5C399.5 117.5 397.3 131.3 404.5 122.5C406.333 120.833 411.9 114.8 419.5 104C420.167 110.333 422.3 123.9 425.5 127.5C429.5 132 432.5 131.5 437 127.5C439.5 124.833 445.3 117.8 448.5 111M448.5 111C450.5 107.167 454.9 99.4 456.5 99C459.667 96.5 465.3 94.5 462.5 106.5C463.333 98.3333 461.7 87.8 448.5 111ZM448.5 111C446 124.167 446.1 147 466.5 133C471.833 128.333 484.1 115.6 490.5 102C488.167 105.333 485.3 112.3 492.5 113.5C494.5 113.833 500.5 113.2 508.5 108C510.667 106.667 515.5 103.3 517.5 100.5C520 97 522.5 89.5 510 92.5C508.088 93.1667 502.41 96.1 495 102.5C493.167 104.167 488.8 109.3 486 116.5C484.833 120 484.2 127.6 491 130C495.333 131.5 508.6 128.9 527 106.5" stroke="#DB3EB1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div id="three-d-main">
                    3D
                </div>
            </div>
            <div class="buttonOne" type="button" onClick = {clickLogIn}> LOG IN </div>
            <div class="buttonTwo" type="button" onClick={clickSignUp}> SIGN UP </div>
            <div class="buttonThree" type="button" onClick={clickInstructionsButton}> INSTRUCTIONS </div>
        </div>
    );
}
