import { createRef, Component } from 'react';
import {RingGeometry, Group, Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry, TorusKnotGeometry, CircleGeometry} from 'three';
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
  

    /*screenshot stuff*/
    strDownloadMime;  

init(){
  this.raycaster = new Raycaster();
  this.sceneObjects = [];

   
   // Set orbit controls
   var orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
   //this.orbitControls.minDistance = 100;
   //this.orbitControls.maxDistance = 700;
   
  orbitControls.update();
  this.dragControls = new DragControls(this.sceneObjects, this.camera, this.renderer.domElement)

  this.dragControls.addEventListener("dragstart", function(event){
    console.log(this.sceneObjects);
    orbitControls.enabled = false;
  })

  this.dragControls.addEventListener("dragend", function(event){
    orbitControls.enabled = true;
  })

  //console.log(this.raycaster);
  //console.log(this.sceneObjects)
  //this.scene.add(this.sceneObjects);
}
componentDidMount(){

    //screenshot stuff 
  this.strDownloadMime = "image/octet-stream";

    // Scene setup
  this.scene = new Scene();
  this.setUpGrid(this.scene, 20,400);

    // Setup lighting sources
  var lights = []
  lights[0] = new DirectionalLight(0xffffff, 1);
  this.scene.add(lights[0])

    // Add camera  
  const fieldOfView = 60;
  const aspect = window.innerWidth / window.innerHeight;
  this.camera = new PerspectiveCamera(fieldOfView, aspect);
  this.camera.position.set( 0, 200, 300 );

    // Add renderer
  this.renderer = new WebGLRenderer({
    preserveDrawingBuffer: true
  });
  this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight, false);
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setClearColor(0xf0f0f0);
  this.mount.appendChild(this.renderer.domElement);

  window.addEventListener( 'resize', this.onWindowResize() );
  //  window.addEventListener( 'click', this.addTransform() );

  this.renderer.domElement.addEventListener( 'mousedown', this.add_remove_transform );

  this.init();

  //this.testAdd();
  this.start();

  const geometry = new BoxGeometry(50, 100, 50);
  const material = new MeshPhongMaterial({ color: 808080 });
  this.cube = new Mesh(geometry, material);
  this.sceneObjects.push(this.cube); 
  this.scene.add(this.cube);
 
 
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
  //  this.testCube();

  // this.renderer.setAnimationLoop(this.renderObjects());

  }
    
  setUpGrid(scene, divisions, gridSize){
    scene.add( new GridHelper(gridSize, divisions) );

    const plane = new Mesh(
      new PlaneGeometry(gridSize, gridSize),
      new MeshBasicMaterial({
        side: DoubleSide
      })
    )

    plane.rotateX(-Math.PI/2);

    scene.add(plane);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
 
  addTransform(){

    this.raycaster.setFromCamera(this.mouse, this.camera);

    for(var i = 0; i < this.sceneObjects.length; i++){
      var clickedOnObject = this.raycaster.intersectObject(this.sceneObjects[i]);

      if(clickedOnObject){
        var transformControls = new TransformControls(this.camera,this.renderer.domElement);
        
   
        transformControls.addEventListener( 'dragging-changed', function ( event ) {
         // orbit.enabled = ! event.value;

        });
        transformControls.attach(clickedOnObject);

        //shape.addEventListener('onclick', this.scene.attach(transformControls));
        this.scene.add(transformControls);
      } 
    }
  }

  addSphere(radius, position, color){
  
    const geometry = new SphereGeometry(radius);
    const material = new MeshBasicMaterial( {color: this.props.color});
    const cone = new Mesh(geometry, material);

    cone.position.z = -10;
    cone.position.x = 3;
    cone.rotation.x = 0;
    cone.rotation.y = 5;

    this.scene.add(cone);
    this.sceneObjects.push(cone);

  }

  addCone(radius, height, radialSegments, position, color){
  
    const geometry = new ConeGeometry(radius, height, radialSegments);
    const material = new MeshPhongMaterial({ color: color });
    const cone = new Mesh(geometry, material);

    cone.position.z = -10;
    cone.position.x = 3;
    cone.rotation.x = 0;
    cone.rotation.y = 5;

    this.scene.add(cone);
  
    this.sceneObjects.push(cone);
    
  }



  testAdd(){
    const geometry = new BoxGeometry(50, 100, 50);
    const material = new MeshPhongMaterial({ color: 808080 });
    this.cube = new Mesh(geometry, material);
    this.sceneObjects[0] = this.cube;
 
    this.scene.add(this.cube);

  }

  addCube(width, height, depth, position, color){
    console.log("creating cube")
    const geometry = new BoxGeometry(width, height, depth);

    const material = new MeshPhongMaterial({ color: color });
    const cube = new Mesh(geometry, material);


    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;

   
    this.scene.add(cube);
    this.sceneObjects.push(cube);
  
    //this.scene.add(this.transformControls);
    
    this.renderer.render(this.scene, this.camera);
    
  }
  

  renderObjects = () => {

    //for(var i = 0; i < this.sceneObjects.length; i++){
      //this.scene.add(this.sceneObjects[i])
    //}
    this.renderer.render(this.scene, this.camera);
    
  }


  animate = () => {
    this.frameId = requestAnimationFrame(this.animate)
    
    this.renderer.render(this.scene, this.camera);
   //this.renderObjects();

  }
  
  start = () => {
    if (!this.frameId) {
      console.log("start");
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  componentWillUnmount() {
    console.log("cancel")
    
    this.mount.removeChild(this.renderer.domElement);
  }

  add_remove_transform(){
    
   /* var intersects = this.raycaster.intersectObject(this.sceneObjects, true);
   
    if(intersects.length > 0){
      let object = intersects[0].object;

      this.transformControls.attach(object);
      this.scene.add(this.sceneObjects);
      this.renderObjects();
      
    }*/
  }



  /*screenshot stuff*/
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
      console.log("screen shot clicked")
      const geometry = new BoxGeometry(50, 100, 50);
    const material = new MeshPhongMaterial({ color: 808080 });
    this.cube = new Mesh(geometry, material);
    this.sceneObjects.push(this.cube);
 
    this.scene.add(this.cube);
      // this.addCube(100,100,100, (0,0,0), 0xffffff)
       /*   var imgData;

        try {
            var strMime = "image/jpeg";
            imgData = this.renderer.domElement.toDataURL(strMime);
            this.saveFile(imgData.replace(strMime, this.strDownloadMime), "MyArtSpace.jpg");

        } catch (e) {
            console.log(e);
            return;
        }
        */
    });
  }

  addCylinder(){
    var cylinder = document.createElement('div');

    cylinder.addEventListener('click', () =>{ 
      const geometry = new PlaneGeometry(50, 100); 
      const material = new MeshBasicMaterial({color: 808080}); 
      var cylinderObj = new Mesh(geometry, material); 
      this.sceneObjects.push(cylinderObj); 
      this.scene.add(cylinderObj); 
    });
  }

  addRing(){
    var ring = document.createElement('div');

    ring.addEventListener('click', () =>{ 
      const geometry = new PlaneGeometry(50, 100); 
      const material = new MeshBasicMaterial({color: 808080}); 
      var ringObj = new Mesh(geometry, material); 
      this.sceneObjects.push(ringObj); 
      this.scene.add(ringObj); 
    });
  }

  addPlane(){
    var plane = document.createElement('div');

    plane.addEventListener('click', () =>{ 
      const geometry = new PlaneGeometry(50, 100); 
      const material = new MeshBasicMaterial({color: 808080}); 
      var planeObj = new Mesh(geometry, material); 
      this.sceneObjects.push(planeObj); 
      this.scene.add(planeObj); 
    });
  }

  addCircle(){
    var circle = document.createElement('div');

    circle.addEventListener('click', () =>{ 
      const geometry = new CircleGeometry(50, 100, 50); 
      const material = new MeshBasicMaterial({color: 808080}); 
      var circleObj = new Mesh(geometry, material); 
      this.sceneObjects.push(circleObj); 
      this.scene.add(circleObj); 
    });
  }

  addTorusKnot(){
    var torus = document.createElement('div');

    torus.addEventListener('click', () =>{ 
      const geometry = new TorusKnotGeometry(10,3,100,16); 
      const material = new MeshBasicMaterial({color: 808080}); 
      var torusKnot = new Mesh(geometry, material); 
      this.sceneObjects.push(torusKnot); 
      this.scene.add(torusKnot); 
    });
  }

  

  addCubeForMe() {
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
        '<i class="fa fa-cube" id="saveCube"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new BoxGeometry(50, 100, 50); 
      const material = new MeshBasicMaterial({color: 808080}); 
      this.cube = new Mesh(geometry, material); 
      this.sceneObjects.push(this.cube); 
      this.scene.add(this.cube); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
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
      const material = new MeshBasicMaterial({color: 808080}); 
      this.cube = new Mesh(geometry, material); 
      this.sceneObjects[0] = this.cube; 
      this.scene.add(this.cube); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
    });
  }



  addSphereForMe() {
    console.log("scAbility");
    
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
      const material = new MeshBasicMaterial({ color: 808080 });
      this.cone = new Mesh(geometry, material);
      this.sceneObjects.push(this.cone); 
      this.scene.add(this.cone); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
    });
  }

  addConeForMe() {
    console.log("scAbility");
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-caret-up" id="saveCone"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new ConeGeometry(50, 100, 50);
      const material = new MeshPhongMaterial({ color: 808080 });
      const cone = new Mesh(geometry, material);
      this.sceneObjects[0] = cone; 
      this.scene.add(cone); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
    });
  }

  addCylinerForMe() {
    console.log("scAbility");
    
    var saveLink = document.createElement('div');
    
    //saveLink.style.position = 'absolute';
    
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-database" id="saveCylinder"></i>';
    this.mount.appendChild(saveLink);
    
    saveLink.addEventListener('click', () =>{
        
      const geometry = new CylinderGeometry(50, 50, 200, 330);
      const material = new MeshPhongMaterial({ color: 808080 });
      const cone = new Mesh(geometry, material);
      this.sceneObjects[0] = cone; 
      this.scene.add(cone); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
    });
  }

  addPlaneForMe() {
    console.log("scAbility");
    
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
      const material = new MeshPhongMaterial({ color: 808080 });
      const cone = new Mesh(geometry, material);
      this.sceneObjects[0] = cone; 
      this.scene.add(cone); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
    });
  }

  addRingForMe() {
    console.log("scAbility");
    
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
      const material = new MeshPhongMaterial({ color: 808080 });
      const cone = new Mesh(geometry, material);
      this.sceneObjects.push(cone); 
      this.scene.add(cone); 
      /*
        try {
            this.addCube(); 
            this.render()

        } catch (e) {
            console.log(e);
            return;
        }*/ 
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

  render(){
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      >
      </div>
    )
  }
}

export default ShapeRenderer;