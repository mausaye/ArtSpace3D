import './GettingStartedInst.css';

export default function SupportFeatures() {
    return (
    <div class="parent">
        <div class="heading">
            Support Features
        </div>
        <div class="body">
            There are 3 support features provided to increase user convenience: 
            <ol>
                <h3 style={{paddingLeft: '4vw'}}><li>Screenshot Feature</li></h3>
                    <p style={{paddingLeft: '4vw'}}>
                        If you click on the camera icon in the upper right corner of the page, a screenshot of the current environment on the plane will be downloaded. 
                        The image's file format will be a jpeg. 
                    </p>
                <h3 style={{paddingLeft: '4vw'}}><li>Message Us</li></h3>
                    <p style={{paddingLeft: '4vw'}}>
                        In the side-menu, if the user clicks on the "Message Us" tab, the user will be taken to a page where they can send a message to the creators. 
                        This feature is to report any issues that may arise, or to ask any questions.
                    </p>
                <h3 style={{paddingLeft: '4vw'}}><li>Instructions</li></h3>
                    <p style={{paddingLeft: '4vw'}}>
                    In the side-menu, if the user clicks on the "Instructions" tab, the user will be taken to this Instructions page. This feature is provide a review 
                    of the app's functionality if needed.
                    </p>
            </ol>
        </div>
        
    </div>
    );
}