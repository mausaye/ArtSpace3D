import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as TbIcons from 'react-icons/tb';
import { SketchPicker } from 'react-color';

export const SideBarData = [
  {
    title: 'Shapes',
    
    icon: <FaIcons.FaShapes />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cube',
       
        icon: <BiIcons.BiCube />
      },
      {
        title: 'Cone',
        
        icon: <TbIcons.TbCone />
      }
    ]
  },
  {
    title: 'Camera',
    
    icon: <AiIcons.AiFillCamera />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Shadow',
        
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Background',
        
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Angle',
        
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
 

  {
    title: 'Messages Us',
    path: '/message',
    icon: <FaIcons.FaEnvelopeOpenText />,

    
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];