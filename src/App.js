import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Render from './ArtSpaceApplication/ShapeRenderer'




function App() {
  return (
    <Render/>

  );
}

export default App;
