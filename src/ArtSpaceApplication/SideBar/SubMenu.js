import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Vector3 } from 'three';

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

function selectShape(shape, renderer){

  switch(shape){
    case "Cube":
      renderer.addCube(50, 50, 50, new Vector3(0,0,0), 0x111111);
      break;
    case "Cone":
      renderer.addCone(1,2,32);
      console.log("cone pressed and added");
      break;
    
  }

 // renderer.renderObjects();

}

const SubMenu = ({ item, renderer }) => {
  const [subnav, setSubnav] = useState(false);


  //const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={()=> setSubnav(true)}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} onClick={()=> {renderer.renderObjects();}}>
              {item.icon}
              <SidebarLabel onClick={()=>{
                 selectShape(item.title, renderer)
                 console.log(item.title);
              }}>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
        
    </>
  );
};

export default SubMenu;

