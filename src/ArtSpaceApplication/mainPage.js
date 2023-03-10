import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import MainMenuRoot from '../MenuFiles/MainMenuRoot';
//import render from './routes/DummyEnvCreationPage';
import InstructionsPage from '../MenuFiles/InstructionsPage';
import GettingStartedInst from '../MenuFiles/InstructionsTabs/GettingStartedInst';
import Shapes from '../MenuFiles/InstructionsTabs/Shapes';
import Color from '../MenuFiles/InstructionsTabs/Color';
import Brightness from '../MenuFiles/InstructionsTabs/Brightness';
import Sizing from '../MenuFiles/InstructionsTabs/Sizing';
import Rotation from '../MenuFiles/InstructionsTabs/Rotation';
import reportWebVitals from '../reportWebVitals';
import App from '../App';
import * as THREE from "three";
import { Component } from 'react';
import ErrorPage from '../MenuFiles/ErrorPage';
import{
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";

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
        path: "Brightness",
        element: <Brightness />
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

