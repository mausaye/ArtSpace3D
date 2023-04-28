import './GettingStartedInst.css';
import lighting from '../../InstructionsPics/11.png';

export default function Lighting() {
    return (
    <div class="parent">
        <div class="heading">
            Lighting
        </div>
        <div class="body">
            The lighting feature is used to create any desired shadows on the scene.
            There are 5 lighting sources available, with ambient light being the first source. 
            The next 4 lights are placed at each corner of the grid plane and can be toggled on and off by clicking on the corresponding lighting source in the sidebar menu.
            <img src={lighting} className="instImg lighting" alt="lighting" />
        </div>
    </div> 
    
    );
}