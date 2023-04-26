import { Component } from 'react';
import { MeshLambertMaterial,RingGeometry, Group, Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry, TorusKnotGeometry, CircleGeometry, Vector3} from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import './ShapeRenderer.css'; 

class ShapeRenderer extends Component{
    scene;
    sceneObjects;
    renderer;
    camera;
    controls;
    orbitControls;
    raycaster;
    mouse;
    dragControls;
    activeObject;
    strDownloadMime;  

    /**
     * props: retrieves the color from the color picker to bind to shapes
     */
    constructor(props){
      super(props);

      // This is needed for the add_remove_transform functions so it knows which "this" to refer to
      this.add_remove_transform = this.add_remove_transform.bind(this);
      this.onWindowResize = this.onWindowResize.bind(this);
     }
 
componentDidMount(){
   // Screenshot setup
   this.strDownloadMime = "image/octet-stream";

   // Scene setup
   this.scene = new Scene();
   this.setUpGrid(this.scene, 20,400);

   // Setup lighting sources
   var lights = []
   lights[0] = new DirectionalLight(0xffffff, 1);
   lights[1] = new AmbientLight( 0x404040 ,1); // soft white light
   this.scene.add(lights[0])
   this.scene.add(lights[1])

   // Add camera  
   const fieldOfView = 60;
   const aspect = window.innerWidth / window.innerHeight;
   this.camera = new PerspectiveCamera(fieldOfView, aspect);
   this.camera.position.set( 0, 200, 300 );

   // Add renderer
   this.renderer = new WebGLRenderer({
     preserveDrawingBuffer: true
   });
  
   this.renderer.setPixelRatio( window.devicePixelRatio );
   this.renderer.setClearColor(0xf0f0f0);
   this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
   
   // Objects placed on the screen
   this.sceneObjects = [];
   
  // Raycaster used to detect what objects have been clicked
  this.raycaster = new Raycaster();
 
  // Generates window based on screen size
  this.onWindowResize();

  // Events
  this.addShapeEvents();

  // Starts frame by frame animations
  this.start();

  this.mount.appendChild(this.renderer.domElement);
  
  this.screenshotAbility();
  this.renderObjects();
  this.addCubeForMe(); 
  this.addSphereForMe(); 
  this.addConeForMe(); 
  this.screenshotAbility();
  this.addPretzelForMe(); 
  this.addRingForMe(); 
  this.addPlaneForMe(); 
  this.addCylinerForMe(); 
}

/*
 * Event handlers
 */
addShapeEvents(){
   // Set orbit controls
   var orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
   
   orbitControls.update();

   // Drag control event listeners
   this.dragControls = new DragControls(this.sceneObjects, this.camera, this.renderer.domElement)

   this.dragControls.addEventListener("dragstart", function(event){
     
     orbitControls.enabled = false;
     
   })

   this.dragControls.addEventListener("dragend", function(event){
     orbitControls.enabled = true;
    
   })

    // Transform control event listeners
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    
    this.transformControls.addEventListener('change', this.renderObjects);
    
    this.transformControls.addEventListener('mouseDown', function () {
      orbitControls.enabled = false;
    });
    this.transformControls.addEventListener('mouseUp', function () {
        orbitControls.enabled = true;
    });

    // Checks for clicks on objects
    this.renderer.domElement.addEventListener( 'click', this.add_remove_transform, false);

    // Window event listeners for object color change, transform, and deletion
    window.addEventListener("keydown", (event)=> {
    if(event.code == "KeyR"){
      this.transformControls.setMode('rotate');
    } else if (event.code == "KeyT"){

      this.transformControls.setMode('translate');
    } else if (event.code == "KeyS"){
      this.transformControls.setMode('scale');
    } else if(event.code == "KeyC"){
      if(this.activeObject!=undefined){
        this.changeColor(this.activeObject);
      }
    } else if(event.code == "KeyD"){
      this.deleteObject(this.activeObject);
    }

    // Window resize
    window.addEventListener( 'resize', this.onWindowResize);
  })
}

/*
 * Event helper functions
 */
deleteObject(object){
  this.scene.remove(object);
  this.transformControls.detach();

}

onWindowResize() {
  if(this.camera!=undefined){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
}

changeColor(object){
  // converts the hex into rgb
  var hex = this.props.color;

  const r = parseInt(hex.slice(1, 3), 16)/255.0;
  const g = parseInt(hex.slice(3, 5), 16)/255.0;
  const b = parseInt(hex.slice(5, 7), 16)/255.0;

  object.material.color.setRGB(r,g,b);

}

add_remove_transform(event){
  
  // Object collision detection can only occur when raycast is defined
   if(this.raycaster != undefined && this.scene != undefined){

    // Retrieve mouse coordinates
    var mouse = new Vector2();
    mouse.x = (event.clientX / this.mount.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / this.mount.clientHeight) * 2 + 1
 
    this.raycaster.setFromCamera(mouse, this.camera);

    // Finds all the objects intesecting with the mouse position
    var intersects = this.raycaster.intersectObjects(this.scene.children, true);

    // Valid clicks are defined as ones that are of a shape we expect
    var validClicks = false;
    
    // Checks to see if something was clicked
     if(intersects.length > 0){
      
        for(var i = 0; i < intersects.length; i++){
          var type = intersects[i].object.geometry.type;

          // Check to see if what we clicked is something we can move
          if(this.acceptableType(type)){
            var object = intersects[i].object;
            validClicks = true;
  
            this.transformControls.attach(object);
            this.activeObject=object;
            this.scene.add(this.transformControls);
            break;
          }
        }
      
      
      } 

      // If not something valid, no transform controls needed
      if(!validClicks){
          this.transformControls.detach();
          this.activeObject = undefined;
          
      }
  }
}
    
/**
 * General Helper functions
 */
  acceptableType(type){
    return type == RingGeometry || type == "TorusKnotGeometry" || type == "BoxGeometry" || type == "SphereGeometry" || type == "CylinderGeometry" || type == "ConeGeometry";
  }

  setUpGrid(scene, divisions, gridSize){
    var gridGrouping = new Group();

    gridGrouping.add( new GridHelper(gridSize, divisions) );

    const plane = new Mesh(
      new PlaneGeometry(gridSize, gridSize),
      new MeshBasicMaterial({
        side: DoubleSide
      })
    )

    plane.rotateX(-Math.PI/2);

    gridGrouping.add(plane);
    scene.add(gridGrouping);

  }

 /**
  * Render functions
  */
  renderObjects = () => {
    this.renderer.render(this.scene, this.camera);
  }

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate)
    
    this.renderer.render(this.scene, this.camera);

  }

  componentWillUnmount() {
  
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  render(){
    return (
      <div> 
        <div ref={mount => {this.mount = mount;}} >
        </div>
      </div>
    )
  }

  /**
   * Screen shot functions
   */
  screenshotAbility() {
    
    var saveLink = document.createElement('div');
    
    saveLink.style.position = 'absolute';
    saveLink.style.top = '500px';
    saveLink.style.width = '100%';
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
    '<i class="fa fa-camera-retro" id="saveLink"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
     
        var imgData;

        try {
            var strMime = "image/jpeg";
            imgData = this.renderer.domElement.toDataURL(strMime);
            this.saveFile(imgData.replace(strMime, this.strDownloadMime), "MyArtSpace.jpg");

        } catch (e) {
            console.log(e);
            return;
        }
        
    });
  }

  saveFile(strData, filename){
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); 
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); 
    } 
  }
  
  /**
   * Shape Functions
   */
  addCubeForMe() {
    
    var cubeDiv = document.createElement('div');
    
   
    cubeDiv.style.left = '100%';
    cubeDiv.style.color = 'white !important';
    cubeDiv.style.textAlign = 'center';
    cubeDiv.innerHTML =
        '<i class="fa fa-cube" id="saveCube"></i>';
    this.mount.appendChild(cubeDiv);
    
    cubeDiv.addEventListener('click', () =>{
        
      const geometry = new BoxGeometry(50, 100, 50); 
      const material = new MeshBasicMaterial({color: this.props.color }); 
      var cube = new Mesh(geometry, material); 
      this.sceneObjects.push(cube); 
      this.scene.add(cube); 
      
    });
  }

  addPretzelForMe() {
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
        '<i class="fa fa-ravelry" id="savePretzel"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new TorusKnotGeometry(10,3,100,16); 
      const material = new MeshBasicMaterial({color: this.props.color}); 
      var pret = new Mesh(geometry, material); 
      this.sceneObjects.push(pret);
      this.scene.add(pret); 
      
    });
  }


  addSphereForMe() {
    
    var saveLink = document.createElement('div');
    
    saveLink.style.position = 'absolute';
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
        '<i class="fa fa-circle"  id="saveSphere"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new SphereGeometry(50);
      const material = new MeshBasicMaterial({ color: this.props.color });
      var sphere = new Mesh(geometry, material);
      this.sceneObjects.push(sphere); 
      this.scene.add(sphere); 
     
    });
  }

  addConeForMe() {
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-caret-up" id="saveCone"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new ConeGeometry(50, 100, 50);
      const material = new MeshLambertMaterial({ color: this.props.color,shininess: 200 });
      const cone = new Mesh(geometry, material);
      this.sceneObjects.push(cone); 
      this.scene.add(cone); 
      
    });
  }

  addCylinerForMe() {
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-database" id="saveCylinder"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new CylinderGeometry(50, 50, 200, 330);
      const material = new MeshPhongMaterial({ color: this.props.color });

      const cylinder = new Mesh(geometry, material);
      this.sceneObjects.push(cylinder); 
      this.scene.add(cylinder); 
      
    });
  }

  addPlaneForMe() {
   
    var saveLink = document.createElement('div');
    
    saveLink.style.position = 'absolute';
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-stop" id="savePlan"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new PlaneGeometry(100, 100);
      const material = new MeshPhongMaterial({ color: this.props.color });
      const plane = new Mesh(geometry, material);
      this.sceneObjects.push(plane); 
      this.scene.add(plane); 
      
    });
  }

  addRingForMe() {
   
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-circle-o-notch" id="saveRing"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new RingGeometry(10, 50, 320);
      const material = new MeshPhongMaterial({ color: this.props.color });
      const ring = new Mesh(geometry, material);
      this.sceneObjects.push(ring); 
      this.scene.add(ring); 
      
    });
  }
}

export default ShapeRenderer;