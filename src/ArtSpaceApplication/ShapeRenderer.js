import { Component } from 'react';
import { CameraHelper,PCFSoftShadowMap,SpotLight,TorusGeometry, CapsuleGeometry, TetrahedronGeometry, RingGeometry, Group, Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry, TorusKnotGeometry, CircleGeometry, Vector3, Triangle, MeshStandardMaterial} from 'three';
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
    mySidebar;
    activeObject;
    strDownloadMime;  
    light_1;
    light_2;
    light_3;
    light_4;

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

   // Add renderer
   this.renderer = new WebGLRenderer({
    preserveDrawingBuffer: true
  });
 
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setClearColor(0xf0f0f0);
  this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = PCFSoftShadowMap;

  this.mount.appendChild(this.renderer.domElement);

   // Add camera  
   const fieldOfView = 60;
   const aspect = window.innerWidth / window.innerHeight;
   this.camera = new PerspectiveCamera(fieldOfView, aspect);
   this.camera.position.set( 0, 200, 300 );
   this.renderer.shadowCameraFar = this.camera.far;

  

  // Set up the grid layout / sidebar
  this.setUpGrid(this.scene, 20,400);
  this.mySidebar = document.createElement('div');

   // Setup lighting sources
   this.light_1 = false;
   this.light_2 = false;
   this.light_3 = false;
   this.light_4 = false;

   var lights = []
  
   //lights[1].position.set(new Vector3(0, 1 , 0));
   //lights[1].target.position.set(new Vector3(0, 30, 0))
   lights[0] = new DirectionalLight(0xffffff, 0.7);
   lights[0].position.copy(new Vector3(200,100,200));
   lights[0].target.position.copy(new Vector3(0, 30, 0))
   this.addLightShadowEffects(lights[0]);

   lights[1] = new DirectionalLight(0xffffff, 0.7);
   lights[1].position.copy(new Vector3(-200, 100, 200));
   lights[1].target.position.copy(new Vector3(0, 30, 0))
   this.addLightShadowEffects(lights[1]);

   lights[2] = new DirectionalLight(0xffffff, 0.7);
   lights[2].position.copy(new Vector3(-200, 100, -200));
   lights[2].target.position.copy(new Vector3(0, 30, 0))
   this.addLightShadowEffects(lights[2]);

   lights[3] = new DirectionalLight(0xffffff, 0.7);
   lights[3].position.copy(new Vector3(200, 100, -200));
   lights[3].target.position.copy(new Vector3(0, 30, 0))
   this.addLightShadowEffects(lights[3]);
   

   lights[4] = new AmbientLight( 0x404040 ,1); // soft white light
  
   lights[5] = new SpotLight(0xF2E66A, 50, 8, 9.2)//(0xffffff, 1);
   lights[5].position.x = 200;
   lights[5].position.y = 0.2;
   lights[5].position.z = 200;

   lights[6] = new SpotLight(0xF2E66A, 50, 8, 9.2)//(0xffffff, 1);
   lights[6].position.x = -200;
   lights[6].position.y = 0.2;
   lights[6].position.z = 200;

   lights[7] = new SpotLight(0xF2E66A, 50, 8, 9.2)//(0xffffff, 1);
   lights[7].position.x = -200;
   lights[7].position.y = 0.2;
   lights[7].position.z = -200;

   lights[8] = new SpotLight(0xF2E66A, 50, 8, 9.2)//(0xffffff, 1);
   lights[8].position.x = 200;
   lights[8].position.y = 0.2;
   lights[8].position.z = -200;

   this.scene.add(lights[0]);
   this.scene.add(lights[0].target);
   this.scene.add(lights[1]);
   this.scene.add(lights[1].target);
   this.scene.add(lights[2]);
   this.scene.add(lights[2].target);
   this.scene.add(lights[3]);
   this.scene.add(lights[3].target);
   this.scene.add(lights[4]);
   this.scene.add(lights[5]);
   this.scene.add(lights[6]);
   this.scene.add(lights[7]);
   this.scene.add(lights[8]);



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


  this.screenshotAbility();
  this.sidemenuAbility();
  this.renderObjects();
  /*this.addCubeForMe(); 
  this.addSphereForMe(); 
  this.addConeForMe(); 
  this.addPretzelForMe(); 
  this.addRingForMe(); 
  this.addPlaneForMe(); 
  this.addCylinerForMe(); 
  */

}

addLightShadowEffects(light){
  light.castShadow = true;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = - 400;
  light.shadow.camera.right = 400;
  light.shadow.camera.far = 1000; 
  light.shadow.camera.fov = 60;
}
/*
 * Event handlers
 */
addShapeEvents(){
   // Set orbit controls
   var orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
   
   orbitControls.update();

   // Drag control event listeners
   var dragControls = new DragControls(this.sceneObjects, this.camera, this.renderer.domElement)

   dragControls.addEventListener("dragstart", function(event){
     
     orbitControls.enabled = false;
     
     
   })

   dragControls.addEventListener("dragend", function(event){
     orbitControls.enabled = true;
    
   })

    // Transform control event listeners
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    
    this.transformControls.addEventListener('change', this.renderObjects);
    
    this.transformControls.addEventListener('mouseDown', function () {
      orbitControls.enabled = false;
     // dragControls.enabled=false;
    });
    this.transformControls.addEventListener('mouseUp', function () {
        orbitControls.enabled = true;
      //  dragControls.enabled = true;
        
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

  for(var i = 0; i < this.sceneObjects.length; i++){
    if(this.sceneObjects[i] == object){
      this.sceneObjects.splice(i,1);
      console.log(this.sceneObjects);
      break;
    }
  
  }  
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
            console.log(object.position)
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
    return type == "CapsuleGeometry" || type == "TorusGeometry" || type == "TetrahedronGeometry" || type == "CircleGeometry" || type == "RingGeometry" || type == "TorusKnotGeometry" || type == "BoxGeometry" || type == "SphereGeometry" || type == "CylinderGeometry" || type == "ConeGeometry";
  }

  setUpGrid(scene, divisions, gridSize){
    var gridGrouping = new Group();

    gridGrouping.add( new GridHelper(gridSize, divisions) );

    const plane = new Mesh(
      new PlaneGeometry(gridSize, gridSize),
      new MeshPhongMaterial({
        side: DoubleSide
      })
    )

    plane.rotateX(-Math.PI/2);
    plane.receiveShadow = true;

    gridGrouping.add(plane);
    scene.add(gridGrouping);
    this.renderer.render(this.scene, this.camera);

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

  sidemenuAbility(){
    this.mySidebar.innerHTML = 
    '<div id="mySidebar"><a href="javascript:void(0)" id="closebtn" >×</a><a href="#" id="3dShapes">3D Shapes</a><div id="dropdown-container-3d">'+
      '<a href="#" id="cube">Cube</a><a href="#" id="sphere">Sphere</a><a href="#" id="cone">Cone</a><a href="#" id="cylinder">Cylinder</a><a href="#" id="knot">Knot</a>'+
      '<a href="#" id="triangluar-prism">Triangular Prism</a><a href="#" id="donut">Donut</a><a href="#" id="capsule">Capsule</a></div>'+
    '<a href="#" id="2dShapes">2D Shapes</a>'+
      '<div id=dropdown-container-2d><a href="#" id="2dRing">Ring</a><a href="#" id="2dSquare">Square</a><a href="#" id="circle">Circle</a></div><a href="#" id="Support">Support</a></div>';
    this.mount.appendChild(this.mySidebar);
    
    var sidemenuOpen = document.createElement('div');
    sidemenuOpen.style.position = 'absolute';
    sidemenuOpen.style.top = '100px';
    sidemenuOpen.style.left = '50px';
    sidemenuOpen.style.fontSize = '3rem';
    sidemenuOpen.innerHTML =
    '<i class="fa fa-bars" aria-hidden="true" id="menuIcon"></i>';
    this.mount.appendChild(sidemenuOpen);
    sidemenuOpen.addEventListener('click', () =>{
      document.getElementById('mySidebar').style.width = "20vw";
      document.getElementById('closebtn').addEventListener('click', () => {
        document.getElementById('mySidebar').style.width = "0vw";
      });
      var threeDropdownShown = false;
      document.getElementById('3dShapes').addEventListener('click', () => {

        if(threeDropdownShown==false){
          threeDropdownShown=true;
          document.getElementById('dropdown-container-3d').style.display = "block";
          document.getElementById('cube').addEventListener('click', () =>{
            const geometry = new BoxGeometry(50, 50, 50); 
            const material = new MeshPhongMaterial({color: this.props.color}); 
            var cube = new Mesh(geometry, material); 
            cube.castShadow = true;
            this.sceneObjects.push(cube); 
            this.scene.add(cube); 
          });
          document.getElementById('sphere').addEventListener('click', () =>{
            const geometry = new SphereGeometry(50);
            const material = new MeshPhongMaterial({ color: this.props.color });
            var sphere = new Mesh(geometry, material);
            sphere.castShadow = true;
            this.sceneObjects.push(sphere); 
            this.scene.add(sphere); //why is this a cone and not a sphere word
          });
          document.getElementById('cone').addEventListener('click', () =>{
            const geometry = new ConeGeometry(50, 100, 50);
            const material = new MeshPhongMaterial({ color: this.props.color });
            const cone = new Mesh(geometry, material);
            cone.castShadow = true;
            this.sceneObjects.push(cone); 
            this.scene.add(cone); 
          });
          document.getElementById('cylinder').addEventListener('click', () =>{
            const geometry = new CylinderGeometry(50, 50, 200, 330);
            const material = new MeshPhongMaterial({ color: this.props.color });
            const cylinder = new Mesh(geometry, material);
            cylinder.castShadow = true;
            this.sceneObjects.push(cylinder); 
            this.scene.add(cylinder); 
          });
          document.getElementById('knot').addEventListener('click', () =>{
            const geometry = new TorusKnotGeometry(10,3,100,16); 
            const material = new MeshPhongMaterial({color: this.props.color}); 
            var knot = new Mesh(geometry, material); 
            knot.castShadow = true;
            this.sceneObjects.push(knot); 
            this.scene.add(knot); 
          });
          document.getElementById('triangluar-prism').addEventListener('click', () =>{
            const geometry = new TetrahedronGeometry(50,0); 
            const material = new MeshPhongMaterial({color: this.props.color}); 
            var tri_prism = new Mesh(geometry, material); 
            tri_prism.castShadow = true;
            this.sceneObjects.push(tri_prism); 
            this.scene.add(tri_prism); 
          });
          document.getElementById('donut').addEventListener('click', () =>{
            const geometry = new TorusGeometry(50,15,100,16); 
            const material = new MeshPhongMaterial({color: this.props.color}); 
            var donut = new Mesh(geometry, material); 
            donut.castShadow = true;
            this.sceneObjects.push(donut); 
            this.scene.add(donut); 
          });
          document.getElementById('capsule').addEventListener('click', () =>{
            const geometry = new CapsuleGeometry(10,3,100,16); 
            const material = new MeshPhongMaterial({color: this.props.color}); 
            var capsule = new Mesh(geometry, material); 
            capsule.castShadow = true;
            this.sceneObjects.push(capsule); 
            this.scene.add(capsule); 
          });
        }
        else{
          threeDropdownShown=false;
          document.getElementById('dropdown-container-3d').style.display = "none";
        }
      });
      var twoDropdownShown = false;
      document.getElementById('2dShapes').addEventListener('click', () => {

        if(twoDropdownShown==false){
          twoDropdownShown=true;
          document.getElementById('dropdown-container-2d').style.display = "block";
        
          document.getElementById('2dRing').addEventListener('click', () =>{
            const geometry = new RingGeometry(10, 50, 320);
            const material = new MeshPhongMaterial({ color: this.props.color });
            const ring = new Mesh(geometry, material);
            ring.castShadow = true;
            this.sceneObjects.push(ring); 
            this.scene.add(ring); 
          });
          document.getElementById('2dSquare').addEventListener('click', () =>{
            const geometry = new PlaneGeometry(100, 100);
            const material = new MeshPhongMaterial({ color: this.props.color });
            const square = new Mesh(geometry, material);
            square.castShadow = true;
            this.sceneObjects.push(square); 
            this.scene.add(square); 
          });
          document.getElementById('circle').addEventListener('click', () =>{
            const geometry = new CircleGeometry(50, 32);
            const material = new MeshPhongMaterial({ color: this.props.color });
            const circle = new Mesh(geometry, material);
            circle.castShadow = true;
            this.sceneObjects.push(circle); 
            this.scene.add(circle); 
          });
          
        }
        else{
          twoDropdownShown=false;
          document.getElementById('dropdown-container-2d').style.display = "none";
        }
      });
      document.getElementById('Support').addEventListener('click', () => {
  
      });
    });
  

  /*
    if(light_1){
      light_1 = false;
      light[1].intensity = 0;
    } else {
      light_1 = true;
      light[1].intensity = 1;
    }
    */
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
  
}

export default ShapeRenderer;