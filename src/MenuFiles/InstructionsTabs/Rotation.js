import './GettingStartedInst.css';

export default function Rotation() {
    return (
        <div class="parent">
            <div class="heading">
                Rotation
            </div>
            <div class="body">
                <h3>Environment Rotation: </h3><p style={{paddingLeft: '4vw'}}>
                    There is a perspective camera used in our application. 
                    To rotate the camera in 3-dimensions, use the left click button on your mouse and drag the cursor in the direction you want your camera to point. 
                    To move the camera along the horizontal axis, simply right click on your mouse and drag. 
                    To zoom in, use your mouse to scroll down. To zoom out, use your mouse to scroll up.
                </p>
                <h3>Object Rotation: </h3><p style={{paddingLeft: '4vw'}}>
                    Objects, both 2D and 3D can be rotated as desired. To activate the ability to rotate an object, first select the object you would like to rotate.
                    A 3-D axis should appear. Secondly, press "R" on your keyboard. This should activate the rotation tools. Multiple circles will appear along the XYZ axes.
                    You can drag this axes until desired rotation is achieved.
                </p>
            </div>
            
        </div>
    );
}