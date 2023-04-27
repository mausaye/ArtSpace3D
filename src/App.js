
import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom'
import './ArtSpaceApplication/SideBar/SideBar.css'
import {SideBarData}  from './ArtSpaceApplication/SideBar/SideBarData';
import {IconContext} from 'react-icons/lib';
import './App.css'; 
import styled from 'styled-components';
import SubMenu from './ArtSpaceApplication/SideBar/SubMenu';
import ShapeRenderer from '../src/ArtSpaceApplication/ShapeRenderer.js';
import { ChromePicker } from 'react-color';

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
  top: 125px;
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

  //  <Nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 // <h1 style={{ color: 'white', textAlign: 'center', flexGrow: 3 }}> Art Space 3D </h1>
  //</Nav>

 return (
    <>

    
     <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
            {SideBarData.map((item, index) => {
              return <SubMenu item={item} key={index}  props={{ color }} ></SubMenu>;
            })}
          </SidebarWrap>
        </SidebarNav>
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
