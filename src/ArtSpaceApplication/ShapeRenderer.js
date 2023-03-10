
import {DirectionalLight,ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, SphereGeometry} from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

export class ShapeRenderer{
    scene;
    sceneObjects;
    renderer;
    camera;
    controls;

  constructor(){
      this.scene = new Scene();

      const light = new AmbientLight( 0x404040 );
      this.scene.add(light);

      const fieldOfView = 75;
      const aspect = window.innerWidth / window.innerHeight;
  
      this.camera = new PerspectiveCamera(fieldOfView, aspect);
     
      this.sceneObjects = [];
      this.renderer = new WebGLRenderer();
      this.renderer.setClearColor(0xffffff);
      this.renderer.setSize(window.innerWidth * 2, window.innerHeight, false);


      this.renderer.setClearColor(0xf0f0f0);

      const dirLight = new DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(10, 20, 0); // x, y, z
      this.scene.add(dirLight);

      this.controls = new DragControls( this.sceneObjects, this.camera, this.renderer.domElement );
      this.controls.activate();
      this.controls.addEventListener("dragstart", function (event){
        event.object.material.transparent = true;
        event.object.material.opacity = 0.5;

      })

      this.controls.addEventListener("dragend", function (event){
       
        event.object.material.opacity = 1;
        
      })

      this.controls.addEventListener("hoveron", function (event){
        event.object.material.wireframe = true;
      })

      this.controls.addEventListener("hoveroff", function (event){
        event.object.material.wireframe = false;
      })

      this.animate = this.animate.bind(this);
      this.animate();
      document.body.append(this.renderer.domElement);
   
  };


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

    const geometry = new BoxGeometry(1, 1, 1);

    const material = new MeshPhongMaterial({ color: 0xff0000 });
    const cube = new Mesh(geometry, material);

    cube.position.z = -10;

    cube.position.x = -3;
  cube.rotation.x = 10;
    cube.rotation.y = 5;
   
    this.scene.add(cube);
    this.sceneObjects.push(cube);
    
    this.renderer.render(this.scene, this.camera);
    console.log("Clicked cube");
  }
  
  renderObjects(){
    
    for(var element of this.sceneObjects){
      this.scene.add(element);
      
    }

    this.renderer.render(this.scene, this.camera);
    
    //requestAnimationFrame(renderer);
  }

  animate() {
    var self = this;

    requestAnimationFrame(self.animate)

    this.renderer.render(this.scene, this.camera);

    
  }

}




