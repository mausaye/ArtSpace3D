import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
//import Render from './ArtSpaceApplication/ShapeRenderer'

import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch
 } from 'react-router-dom';
 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom'
import './ArtSpaceApplication/SideBar/SideBar.css'
import {SideBarData}  from './ArtSpaceApplication/SideBar/SideBarData';
import * as AiIcons from "react-icons/ai";
import {IconContext} from 'react-icons/lib';
import './App.css'; 
import styled from 'styled-components';
import SubMenu from './ArtSpaceApplication/SideBar/SubMenu';
//const {ShapeRenderer} = require('../src/ArtSpaceApplication/ShapeRenderer.js');

//import ShapeRenderer from '../src/ArtSpaceApplication/ShapeRenderer.js';
import { Shape } from 'three';
import ShapeRenderer from '../src/ArtSpaceApplication/ShapeRenderer.js';
import { ChromePicker } from 'react-color';
import addCube from '../src/ArtSpaceApplication/ShapeRenderer.js';
const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const ColorPickerContainer = styled.div`
  position: absolute;
  top: 180px;
  right: 25px;
  
  z-index: 999;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;



const App = () => {
    
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [colorPickerOpen, setColorPickerOpen] = useState(false); 

  const [color, setColor] = useState('#fff');
  const handleColorClick = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handleColorChange = (newcolor) => {
    setColor( newcolor.hex);
    
    
  };

 return (
    <>
    
     <IconContext.Provider value={{ color: '#fff' }}>
        <Nav style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ color: 'white'}}> Art Space 3D </h1>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SideBarData.map((item, index) => {
              return <SubMenu item={item} key={index} props = {<ShapeRenderer color={color} />}></SubMenu>;
            })}
          </SidebarWrap>
        </SidebarNav>
        <ColorPickerContainer className="moveSize">
        <ChromePicker
    color={color}
   onChange={handleColorChange}
    className=''
/>
        </ColorPickerContainer> 
      </IconContext.Provider>
      
    <ShapeRenderer/>
           

    

    </>
    
    )

}

export default App;

/*
<IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SideBarData.map((item, index) => {
              return <SubMenu item={item} key={index} renderer={render} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
*/