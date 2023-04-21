import { createRef, Component } from 'react';
import {Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry} from 'three';
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
    raycaster = new Raycaster();;
    mouse;
    cube; 

    /*screenshot stuff*/
    strDownloadMime;

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
    this.sceneObjects = [];
    this.renderer = new WebGLRenderer({
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight, false);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0xf0f0f0);
    this.mount.appendChild(this.renderer.domElement);

    // Set orbit controls
    this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
		//this.orbitControls.minDistance = 100;
		//this.orbitControls.maxDistance = 700;
    
    this.orbitControls.update();
     
		window.addEventListener( 'resize', this.onWindowResize() );
  //  window.addEventListener( 'click', this.addTransform() );
      
   
    this.start();
    
    this.renderObjects();
    this.addCubeForMe(); 
    this.addSphereForMe(); 
    this.addConeForMe(); 
    this.screenshotAbility();
    
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

  testAdd(){
    const geometry = new BoxGeometry(50, 100, 50);
    const material = new MeshPhongMaterial({ color: 808080 });
    this.cube = new Mesh(geometry, material);
    this.sceneObjects[0] = this.cube;
 
    this.scene.add(this.cube);

  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
 
  
  addTransform(){
    console.log('click');
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
    const material = new MeshBasicMaterial({ color: 0xff0000 });
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
    const material = new MeshPhongMaterial({ color: 0xff0000 });
    const cone = new Mesh(geometry, material);

    cone.position.z = -10;
    cone.position.x = 3;
    cone.rotation.x = 0;
    cone.rotation.y = 5;

    this.scene.add(cone);
  
    this.sceneObjects.push(cone);
    
  }

  addCube(width, height, depth, position, color){

    const geometry = new BoxGeometry(width, height, depth);

    const material = new MeshPhongMaterial({ color: color });
    const cube = new Mesh(geometry, material);

    cube.position.z = position.z;

    cube.position.x = position.x;
    cube.position.y = position.y;
   
    this.scene.add(cube);
    this.sceneObjects.push(cube);
    //this.scene.add(this.transformControls);
    
   // this.renderer.render(this.scene, this.camera);
    
  }
  

  renderObjects = () => {
    console.log("jhi")
    this.renderer.render(this.scene, this.camera);
    
  }


  animate = () => {
    this.frameId = requestAnimationFrame(this.animate)
    
    this.renderer.render(this.scene, this.camera);
   

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

  /*screenshot stuff*/
  screenshotAbility() {
    console.log("scAbility");
    
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

  addCubeForMe() {
    console.log("scAbility");
    
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
      this.sceneObjects[0] = this.cone; 
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
    saveLink.style.left = '100%';
   
    saveLink.style.color = 'white !important';
    saveLink.style.textAlign = 'center';
    saveLink.innerHTML =
      '<i class="fa fa-caret-up" aria-hidden="true" id="saveCone"></i>';
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