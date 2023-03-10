import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as TbIcons from 'react-icons/tb';

export const SideBarData = [
  {
    title: 'Shapes',
    path: '/shapes',
    icon: <FaIcons.FaShapes />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cube',
        path: '/shapes/users',
        icon: <BiIcons.BiCube />
      },
      {
        title: 'Cone',
        path: '/shapes/revenue',
        icon: <TbIcons.TbCone />
      }
    ]
  },
  {
    title: 'Camera',
    path: '/camera',
    icon: <AiIcons.AiFillCamera />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Shadow',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Background',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Angle',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Colors',
    path: '/colors',
    icon: <AiIcons.AiOutlineBgColors />
  },

  {
    title: 'Messages Us',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];