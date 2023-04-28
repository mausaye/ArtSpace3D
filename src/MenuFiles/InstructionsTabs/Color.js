import './GettingStartedInst.css';
import color1 from '../../InstructionsPics/7.png';
import hex from '../../InstructionsPics/8.png';
import rgb from '../../InstructionsPics/9.png';
import hsl from '../../InstructionsPics/HSL.png';

export default function Color() {
    return (
        <div class="parent">
            <div class="heading">
                Color
            </div>
            <div class="body">
                A shape's color can be chosen and changed with the color picker on the right side of the screen. 
                <h3>Operating the Color Picker:</h3><p style={{paddingLeft: '4vw'}}>
                    A color can be chosen in 1 of 2 ways:
                    <ol>
                        <li>Drag the color slider around to pick a desired range. Then, click on the desired shade in the color palette. 
                            <img src={color1} className="instImg color1" alt="color1" style={{paddingTop: '2%', paddingBottom: '2%'}}/>
                        </li>
                        <li>Click on the up and down arrows to the right to enter a wanted color by: </li>
                        <ul>
                            <li>Hex value
                                <img src={hex} className="instImg hex" alt="hex" style={{paddingTop: '2%', paddingBottom: '2%'}}/>
                            </li>
                            <li>RGB value
                                <img src={rgb} className="instImg rgb" alt="rgb" style={{paddingTop: '2%', paddingBottom: '2%'}}/>
                            </li>
                            <li>HSL value
                                <img src={hsl} className="instImg hsl" alt="hsl" style={{paddingTop: '2%', paddingBottom: '2%'}}/>
                            </li>
                        </ul>
                    </ol>
                </p>
                <h3>Choosing an Initial Color:</h3><p style={{paddingLeft: '4vw'}}>
                    When adding shapes to the plane, a shape's default color is white. If you already know what color you would like your shape to be, first select the desired color on your color picker.
                    Then, click the object from the side menu you would like to add onto your scene. Your selected object will appear on the plane in the indicated color.
                </p>
                <h3>Changing the Color of an Existing Shape:</h3><p style={{paddingLeft: '4vw'}}>
                    If you would like to change the color of your shape after placing it in the plane, simply select a new color on your color picker, click your shape, and press "C" on your keyboard.
                    The object's color will update to correspond with the currently selected color.
                </p>
            </div>
        </div>
        );
}