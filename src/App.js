

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

import ShapeRenderer from '../src/ArtSpaceApplication/ShapeRenderer.js';

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

//var render= new ShapeRenderer();

function createSlider(){
  
//  <div class="slidecontainer">
  //<input type="range" min = "1" max = "100" class="slider" id="myRange"></input>
 // </div>
}

function createEditMenu(mousePosition) {
 // <ContextMenu top={mousePosition.y} left={mousePosition.x}>

   // <li> <input type="range" min = "1" max = "100" class="slider" id="myRange"></input></li>
  //</ContextMenu> <div top={1150} left={150}>

//<li> <input type="range" min = "1" max = "100" class="slider" id="myRange"></input></li>
//</div>
   // {render.getRenderer}
}

const App = () => {
    
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  /*
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  })

  const download = (image, {name="test", extension="jpg"}={}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }

  const downloadScreenshot = () => {
    takeScreenshot(ref.current).then(download);
  }

  */

  return (
    <>
  
    
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
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
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