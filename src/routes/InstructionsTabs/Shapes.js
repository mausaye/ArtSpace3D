import './GettingStartedInst.css';

export default function Shapes() {
    return (
        <div class="parent">
            <div class="heading">
                Shapes
            </div>
            <div class="body">
                Our application has the following shapes:
                <ul>
                    <li>3D shapes (cube, sphere, etc.)</li>
                    <li>2D shaoes (square, circle, etc.)</li>
                </ul>
                In order to make shapes materialize in the free space, drag and drop your desired shape from the toolbar into the location of your choice.
            </div>
            
        </div>
    );
}