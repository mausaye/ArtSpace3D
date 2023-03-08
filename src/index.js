import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainMenuRoot from './routes/MainMenuRoot';
import DummyEnvironmentCreationPage from './routes/DummyEnvCreationPage';
import InstructionsPage from './routes/InstructionsPage';
import GettingStartedInst from './routes/InstructionsTabs/GettingStartedInst';
import Shapes from './routes/InstructionsTabs/Shapes';
import Color from './routes/InstructionsTabs/Color';
import Brightness from './routes/InstructionsTabs/Brightness';
import Sizing from './routes/InstructionsTabs/Sizing';
import Rotation from './routes/InstructionsTabs/Rotation';
import reportWebVitals from './reportWebVitals';

import{
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenuRoot />,
  },
  {
    path: "/EnvironmentCreationPage",
    element: <DummyEnvironmentCreationPage/>
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();