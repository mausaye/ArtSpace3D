import React from 'react';

import '../index.css';
import MainMenuRoot from '../MenuFiles/MainMenuRoot';
//import render from './routes/DummyEnvCreationPage';
import InstructionsPage from '../MenuFiles/InstructionsPage';
import GettingStartedInst from '../MenuFiles/InstructionsTabs/GettingStartedInst';
import Shapes from '../MenuFiles/InstructionsTabs/Shapes';
import Color from '../MenuFiles/InstructionsTabs/Color';
import SupportFeatures from '../MenuFiles/InstructionsTabs/SupportFeatures';
import Sizing from '../MenuFiles/InstructionsTabs/Sizing';
import Rotation from '../MenuFiles/InstructionsTabs/Rotation';
import ErrorPage from '../MenuFiles/ErrorPage';
import LogIn from '../MenuFiles/Login';
import SignUp from '../MenuFiles/SignUp';
import MessageUs from './SideBar/MessageUs/MessageUs';
import StartPage from '../MenuFiles/StartPage.js'
import{
  createBrowserRouter, 
} from "react-router-dom";

import App from '../App'

export default createBrowserRouter([
  {
    path: "/",
    element: <MainMenuRoot />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/EnvironmentCreationPage",

    element: <App/>,

  },
  {
    path: "/LogIn",
    element: <LogIn/>,
  },

  {
    path: "/SignUp",
    element: <SignUp/>,
  },
  {
    path: "/message", 
    element: <MessageUs /> 

  },

  {
    path: "/StartPage",
    element: <StartPage/>,
  },
 
  {
    path: "/InstructionsPage/",
    element: <InstructionsPage/>,
    children: [
      {
        path: "GettingStarted",
        element: <GettingStartedInst />
      },
      {
        path: "Shapes",
        element: <Shapes />
      },
      {
        path: "Color",
        element: <Color />
      },
      {
        path: "SupportFeatures",
        element: <SupportFeatures />
      },
      {
        path: "Sizing",
        element: <Sizing />
      },
      {
        path: "Rotation",
        element: <Rotation />
      },
    ],
    
  },
]);

