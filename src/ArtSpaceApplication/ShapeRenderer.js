
import {Raycaster, AxesHelper, DoubleSide, GridHelper, DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry, PlaneGeometry, Vector2} from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export class ShapeRenderer{
    scene;
    sceneObjects;
    renderer;
    camera;
    controls;
    orbitControls;
    raycaster;
    mouse;
  

  constructor(){
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    var divisions = 20;
    var gridSize = 400;
    // Scene setup
      this.scene = new Scene();
      this.scene.add( new GridHelper(gridSize, divisions) );
      const plane = new Mesh(
        new PlaneGeometry(gridSize, gridSize),
        new MeshBasicMaterial({
          side: DoubleSide
        })
      )
      plane.rotateX(-Math.PI/2);

      this.scene.add(plane);
      const light = new AmbientLight( 0x404040 );
      this.scene.add(light);

      const fieldOfView = 60;
      const aspect = window.innerWidth / window.innerHeight;
  
      this.camera = new PerspectiveCamera(fieldOfView, aspect);
      this.camera.position.set( 0, 200, 300 );

      this.sceneObjects = [];
      this.renderer = new WebGLRenderer();
      this.renderer.setClearColor(0xffffff);
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setClearColor(0xf0f0f0);

      const dirLight = new DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(10, 20, 0); // x, y, z
      this.scene.add(dirLight);

      this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
			this.orbitControls.minDistance = 100;
			this.orbitControls.maxDistance = 700;
      this.orbitControls.update();

     // this.orbitControls.addEventListener('change', this.render());

			window.addEventListener( 'resize', this.onWindowResize() );
      
      window.addEventListener( 'click', this.onMouseClick);
      
    
     //this.scene.add(new AxesHelper(50));
     // const geometry = new BoxGeometry(50, 50, 50);

     // const material = new MeshPhongMaterial({ color: 0x000000 });
     // const cube = new Mesh(geometry, material);
     // this.transformControls.attach(cube);
    //  console.log(this.transformControls.getMode());
     // this.scene.add(cube);
     // this.sceneObjects.push(cube);

      //this.scene.add(this.transformControls);

      this.animate = this.animate.bind(this);

      this.animate();
      document.body.append(this.renderer.domElement);
   
  }

  onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

  }
 
  onMouseClick(orbit){
    console.log("clicked!");
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
  
  modifyShapeSize(shapeType, shapeObj, resizeVector){
    switch(shapeType){
      case "Cone":
        shapeObj.scale(resizeVector.x, resizeVector.y)
        break;
    }

  }

  renderObjects(){
    
    for(var element of this.sceneObjects){
      this.scene.add(element);
    }

    this.renderer.render(this.scene, this.camera);
    
  }

  render() {

    this.renderer.render( this.scene, this.camera );

  }

  animate() {
    var self = this;

    requestAnimationFrame(self.animate)

    this.renderer.render(this.scene, this.camera);

  }

}