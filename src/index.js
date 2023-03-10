import React from 'react';
import ReactDOM from 'react-dom/client';
import createBrowserRouter from './ArtSpaceApplication/mainPage'
import reportWebVitals from './reportWebVitals';
import ErrorPage from './routes/ErrorPage';

import{
    createBrowserRouters,
    RouterProvider,
  } from "react-router-dom";

<<<<<<< HEAD
=======
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenuRoot />,
    errorElement: <ErrorPage />,
  },

  /*
  {
    path: "/EnvironmentCreationPage",
    element: <DummyEnvironmentCreationPage/>
  },
  */
>>>>>>> e247daf37bcb0290f03495bb55b96fd7bc60b37e

import './index.css';
import App from './App';

const router = createBrowserRouter;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

     <RouterProvider router = {router}/>

    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
