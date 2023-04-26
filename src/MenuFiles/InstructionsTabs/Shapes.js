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
                    <li>3D shapes (cube, sphere, cones, knots, and cylinders.)</li>
                    <li>2D shaoes (square, circle, and rings.)</li>
                </ul>
                In order to make shapes materialize in the free space, click your desired shape from the toolbar and the shape will appear at the origin of the grid.
            </div>
            
        </div>
    );
}