import './GettingStartedInst.css';
import sidebarIcon from '../../InstructionsPics/1.png';
import shapesSidebar from '../../InstructionsPics/2.png';
import shapeClick from '../../InstructionsPics/3.png';
import moveShape from '../../InstructionsPics/4.png';

export default function Shapes() {
    return (
        <div class="parent">
            <div class="heading">
                Shapes
            </div>
            <div class="body">
                Our application has the following types of shapes:
                <ul>
                    <li>3D shapes (i.e. cube, sphere, cones, knots, cylinders, etc.)</li>
                    <li>2D shapes (i.e. square, circle, etc.)</li>
                </ul>
                In order to access the available shapes, first click the side-menu icon. 
                <img src={sidebarIcon} className="instImg sidebarIcon" alt="sidebarIcon" />
                <br></br>
                Then, click on the desired shape type ("3D Shapes" or "2D Shapes"). 
                Clicking on the desired shape type will cause a dropdown menu of usable shapes to appear.
                <img src={shapesSidebar} className="instImg shapesSidebar" alt="shapesSidebar" />
                <br></br>
                <h3>Adding a Shape:</h3><p style={{paddingLeft: '4vw'}}>In order to add a shape, click on the name of the desired shape. This will cause the shape to appear in the center of the screen. <img src={shapeClick} className="instImg shapeClick" alt="shapeClick" style={{paddingTop: '2%'}}/></p>
                <h3>Moving a Shape:</h3><p style={{paddingLeft: '4vw'}}>In order to move a shape around the screen, just click and drag the desired shape around. 
                You can also press the "T" key on the keyboard to cause an xyz-axis to appear on the shape. Pressing and dragging the arrows on each axis will allow the user to move the shape's location on the current axis. <img src={moveShape} className="instImg moveShape" alt="moveShape" style={{paddingTop: '2%'}}/></p>
                <h3>Deleting a Shape:</h3><p style={{paddingLeft: '4vw'}}>In order to delete a shape, click on said shape in the environment. Then, click on the "D" key on your keyboard. This will cause the shape to be removed from the screen.</p>
            </div>
        </div>
    );
}