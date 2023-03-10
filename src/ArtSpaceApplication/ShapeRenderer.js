
import {ConeGeometry,AmbientLight,MeshPhongMaterial,Scene,Mesh,MeshBasicMaterial,WebGLRenderer,BoxGeometry, PerspectiveCamera, Vector3} from 'three';

export class ShapeRenderer{
    scene;
    sceneObjects;
    renderer;
    camera;

  constructor(){
      this.scene = new Scene();

      const light = new AmbientLight( 0x404040 );
      this.scene.add(light);

      const fieldOfView = 75;
      const aspect = window.innerWidth / window.innerHeight;
  
      this.camera = new PerspectiveCamera(fieldOfView, aspect);
     
      this.sceneObjects = [];
      this.renderer = new WebGLRenderer();
      this.renderer.setSize(window.innerWidth * 2, window.innerHeight, false);
      document.body.append(this.renderer.domElement);
   
  }

  addCone(radius, height, radialSegments, position, color){
    // const width = 1;
    // const height = 1;
    // const depth = 1;
    const geometry = new ConeGeometry(radius, height, radialSegments);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const cone = new Mesh(geometry, material);

    cone.position.z = -10;
    cone.position.x = 3;
    cone.rotation.x = 0;
    cone.rotation.y = 5;

    this.sceneObjects.push(cone);
    
  }

  addCube(width, height, depth, position, color){
    // const width = 1;
    // const height = 1;
    // const depth = 1;
    const geometry = new BoxGeometry(width, height, depth);
    const material = new MeshPhongMaterial({ color: 0xff0000 });
    const cube = new Mesh(geometry, material);

    cube.position.z = -10;
    cube.rotation.x = 10;
    cube.rotation.y = 5;

    this.sceneObjects.push(cube);
    
  }
  
  renderObjects(){
    console.log(this.sceneObjects.length);
    for(var element of this.sceneObjects){
      this.scene.add(element);
      
    }

    this.renderer.render(this.scene, this.camera);
    
    //requestAnimationFrame(renderer);
  }


}

