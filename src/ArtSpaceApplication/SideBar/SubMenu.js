import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
      renderer.addCube(1,1,1);
      break;
    case "Cone":
      renderer.addCone(1,2,32);
      break;
    
  }

 // renderer.renderObjects();

}

const SubMenu = ({ item, renderer }) => {
  const [subnav, setSubnav] = useState(false);

  console.log(renderer);
  const showSubnav = () => setSubnav(!subnav);

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
            <DropdownLink to={item.path} key={index} onClick={()=> {
                renderer.addCube(1,1,1, (0,0,0))
                renderer.renderObjects();
                console.log("THE CUBE HAD LANDED");
                }}>
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

