import { Clock } from 'three';

function startRenderLoop(renderer, scene, camera){

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

function stopAnimationLoop(renderer){
    renderer.setAnimationLoop(null);
}


function animate() {
    requestAnimationFrame(animate)


    renderer.render(scene, camera);

    
}
