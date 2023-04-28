import './GettingStartedInst.css';
import sizing from '../../InstructionsPics/5.png';

export default function Sizing() {
    return (
        <div class="parent">
            <div class="heading">
                Sizing
            </div>
            <div class="body">
                Objects, both 2D and 3D, can be made bigger or smaller according to the user's desire. 
                This effect can be achieved by clicking on the shape you would like to transform, then pressing the "S" button on your keyboard. 
                A 3D coordinate plane will appear on the shape. 
                Simultaneously clicking and dragging around each axis will allow you to stretch or shrink your shape in any direction.
                <img src={sizing} className="instImg sizing" alt="sizing" />
            </div>
            
        </div>
    );
}