import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const SidebarLink = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled.div`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

function selectShape(shape, renderer, colorx){

  switch(shape){
    case "Cube":
      
      renderer.addCube(1,1,1,1,colorx);
      break;
    case "Cone":
      renderer.addCone(1,2,32,1,colorx);
      break;
    
  }
 

 // renderer.renderObjects();

}


const SubMenu = ({ item, renderer,color }) => {
  const [subnav, setSubnav] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false); 
  const [selectedColor, setSelectedColor] = useState('#008000'); 


  //console.log(renderer);
  const showSubnav = () => {
    setSubnav(!subnav)
  };
  const handleColorClick = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handleColorChange = (newcolor) => {
    setSelectedColor( newcolor.hex);
    
    
  };
  
  

  return (
    <>
    
      <SidebarLink  onClick={showSubnav }>
        <Link to={item.path} > 
        <div>
          {item.icon}
          
          <SidebarLabel onClick={handleColorClick}>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
        </Link>
      </SidebarLink>
     

     
      
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            
            <DropdownLink to={item.path} key={index} onClick={()=> {
            
                renderer.renderObjects();
             
                }}>
              {item.icon}
              <SidebarLabel onClick={()=>{
                
                console.log(color)
                 selectShape(item.title, renderer, color)// rught now color.hex is undefined
                console.log(item.title);
              }}>{item.title}
              </SidebarLabel>
            </DropdownLink>
           

          );
        })}
     
     
        
    </>
  );
};

export default SubMenu;

