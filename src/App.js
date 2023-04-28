import React, { useState } from 'react'
import {IconContext} from 'react-icons/lib';
import './App.css'; 
import styled from 'styled-components';
import ShapeRenderer from '../src/ArtSpaceApplication/ShapeRenderer.js';
import { ChromePicker } from 'react-color';

const ColorPickerContainer = styled.div`
  position: absolute;
  top: 125px;
  right: 25px;
  
  z-index: 999;
`;


const App = () => {

  const [color, setColor] = useState('#fff');

  const handleColorChange = (newcolor) => {
    setColor( newcolor.hex);
  };

 return (

    <>
     <IconContext.Provider value={{ color: '#fff' }}>
        <ColorPickerContainer className="moveSize">
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            className=''
            disableAlpha={true}
          />
        </ColorPickerContainer> 
      </IconContext.Provider>
      <ShapeRenderer color={color}/>
    </>
    )
}

export default App;
