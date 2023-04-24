import React from 'react';

import '../index.css';
import MainMenuRoot from '../MenuFiles/MainMenuRoot.js';
//import render from './routes/DummyEnvCreationPage';
<<<<<<< HEAD
import InstructionsPage from '../MenuFiles/InstructionsPage';
import GettingStartedInst from '../MenuFiles/InstructionsTabs/GettingStartedInst';
import Shapes from '../MenuFiles/InstructionsTabs/Shapes';
import Color from '../MenuFiles/InstructionsTabs/Color';
import Camera from '../MenuFiles/InstructionsTabs/Camera';
import Sizing from '../MenuFiles/InstructionsTabs/Sizing';
import Rotation from '../MenuFiles/InstructionsTabs/Rotation';
import ErrorPage from '../MenuFiles/ErrorPage';
import LogIn from '../MenuFiles/Login';
import SignUp from '../MenuFiles/SignUp';
import MessageUs from './SideBar/MessageUs/MessageUs';
import { SketchPicker } from 'react-color';
=======
import InstructionsPage from '../MenuFiles/InstructionsPage.js';
import GettingStartedInst from '../MenuFiles/InstructionsTabs/GettingStartedInst.js';
import Shapes from '../MenuFiles/InstructionsTabs/Shapes.js';
import Color from '../MenuFiles/InstructionsTabs/Color.js';
import Camera from '../MenuFiles/InstructionsTabs/Camera.js';
import Sizing from '../MenuFiles/InstructionsTabs/Sizing.js';
import Rotation from '../MenuFiles/InstructionsTabs/Rotation.js';
import ErrorPage from '../MenuFiles/ErrorPage.js';
import LogIn from '../MenuFiles/Login.js';
import SignUp from '../MenuFiles/SignUp.js';
>>>>>>> quynh
import StartPage from '../MenuFiles/StartPage.js'
import{
  createBrowserRouter, 
} from "react-router-dom";

import App from '../App.js'

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
    path: "/message", 
    element: <MessageUs /> 

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
        path: "Camera",
        element: <Camera />
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

