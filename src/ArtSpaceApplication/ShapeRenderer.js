import { createRef, Component } from 'react';
import { RingGeometry, Group, Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry, TorusKnotGeometry, CircleGeometry, Vector3} from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import './ShapeRenderer.css'; 
import { ChromePicker } from 'react-color';

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
    /*screenshot stuff*/
    strDownloadMime;  

    constructor(props){
      super(props);
      this.add_remove_transform = this.add_remove_transform.bind(this);
      
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
  
   // this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight, false);
   this.renderer.setPixelRatio( window.devicePixelRatio );
   this.renderer.setClearColor(0xf0f0f0);
   this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
   //this.mount.appendChild(this.renderer.domElement);

   // this.raycaster.setFromCamera(this.mouse, this.camera)
   this.sceneObjects = [];
   
   // Set orbit controls
   var orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
   //this.orbitControls.minDistance = 100;
   //this.orbitControls.maxDistance = 700;
   
   orbitControls.update();
   this.dragControls = new DragControls(this.sceneObjects, this.camera, this.renderer.domElement)

   this.dragControls.addEventListener("dragstart", function(event){
     
     orbitControls.enabled = false;
     
   })

   this.dragControls.addEventListener("dragend", function(event){
     orbitControls.enabled = true;
    
   })

  this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
  
  this.transformControls.addEventListener('change', this.renderObjects);
  
  this.transformControls.addEventListener('mouseDown', function () {
     orbitControls.enabled = false;
  });
  this.transformControls.addEventListener('mouseUp', function () {
      orbitControls.enabled = true;
  });

  this.raycaster = new Raycaster();
 
   console.log(this.raycaster)
   this.renderer.domElement.addEventListener( 'click', this.add_remove_transform, false);

  window.addEventListener("keydown", (event)=> {
    if(event.code == "KeyR"){
      this.transformControls.setMode('rotate');
    } else if (event.code == "KeyT"){

      this.transformControls.setMode('translate');
    } else if (event.code == "KeyS"){
      this.transformControls.setMode('scale');
    }
  })
   window.addEventListener( 'resize', this.onWindowResize());
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


add_remove_transform(event){
  
   if(this.raycaster != undefined && this.scene != undefined){
    var mouse = new Vector2();
    mouse.x = (event.clientX / this.mount.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / this.mount.clientHeight) * 2 + 1
    //mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
   
    this.raycaster.setFromCamera(mouse, this.camera);
     var intersects = this.raycaster.intersectObjects(this.scene.children, true);
     //console.log(this.scene.children);
    // console.log(this.sceneObjects);

     //console.log(intersects[intersects.length-1].x)
     //console.log(intersects[intersects.length-1].y)
    var validClicks = false;
    
     if(intersects.length > 0){
      
        for(var i = 0; i < intersects.length; i++){
          var type = intersects[i].object.geometry.type;
          if(this.acceptableType(type)){
            var object = intersects[i].object;
            validClicks = true;
            console.log("valid clikc");
            this.transformControls.attach(object);
           
            this.scene.add(this.transformControls);
            break;
          }
        }
      
      
      } 

      if(!validClicks){
          this.transformControls.detach();
          this.activeObject = undefined;
          
      }
  }
}
    
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

  onWindowResize() {
    if(this.camera!=undefined){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
  }
 
  
  renderObjects = () => {

    this.renderer.render(this.scene, this.camera);
    
  }


  animate = () => {
    this.frameId = requestAnimationFrame(this.animate)
    
    this.renderer.render(this.scene, this.camera);

  }
  
  start = () => {
    if (!this.frameId) {
      
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  componentWillUnmount() {
  
    this.mount.removeChild(this.renderer.domElement);
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
      const material = new MeshPhongMaterial({ color: this.props.color });
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
      <div> 
     
      <div
        ref={mount => {
          this.mount = mount;
        }}
      >
        
      </div>
      </div>
    )
  }
}

export default ShapeRenderer;