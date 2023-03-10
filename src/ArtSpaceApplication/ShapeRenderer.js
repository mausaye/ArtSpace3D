
import {PointLight,AmbientLight,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, Vector3} from 'three';

export class ShapeRenderer{
   scene;
   sceneObjects;
   renderer;
   camera;

  constructor(){
      this.scene = new Scene();
      const fieldOfView = 75;
      const aspect = window.innerWidth / window.innerHeight;
  
      this.camera = new PerspectiveCamera(fieldOfView, aspect);
      this.camera.lookAt(0,0,0);
  
      this.sceneObjects = [];
      this.renderer = new WebGLRenderer();
      this.renderer.setSize(window.innerWidth * 2, window.innerHeight, false);
      document.body.append(this.renderer.domElement);
   
  }


  addCube(width, height, depth, position){
    // const width = 1;
    // const height = 1;
    // const depth = 1;
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const cube = new Mesh(geometry, material);

    cube.position.z = -5;
    cube.rotation.x = 10;
    cube.rotation.y = 5;

    this.sceneObjects.push(cube);
    
    
    
  }
  
  renderObjects(){
    for(var element of this.sceneObjects){
     // this.scene.add(element);
      console.log(element);
    }

    this.renderer.render(this.scene, this.camera);
    
    //requestAnimationFrame(renderer);
  }


}

