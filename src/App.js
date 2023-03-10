const {ShapeRenderer} = require('../src/ArtSpaceApplication/ShapeRenderer.js');
function App() {
  var render = new ShapeRenderer();

  render.addCube(1, 1, 1, (0,0,0));

  render.renderObjects();
  console.log("hi");

  //render.animate();

}

export default App;
