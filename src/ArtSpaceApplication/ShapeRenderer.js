import { createRef, Component } from 'react';
import {Raycaster, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2, CylinderGeometry} from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import * as THREE from 'three';

class ShapeRenderer extends Component{
    scene;
    sceneObjects;
    renderer;
    camera;
    controls;
    orbitControls;
    raycaster = new Raycaster();;
    mouse;

  componentDidMount(){
    const canvas = this.s
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
    this.renderer = new WebGLRenderer();
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
      
    this.testAdd();
    
   this.renderObjects();
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
    console.log("Hi")
    this.renderer.render(this.scene, this.camera);
   

  }
  
  componentWillUnmount() {
    console.log("cancel")
  
    this.mount.removeChild(this.renderer.domElement);
  }

  render(){
    return (
      <div
       
        ref={mount => {
          this.mount = mount;
        }}
      />
    )
  }
}
export default ShapeRenderer;