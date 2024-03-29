import React from 'react';
import ReactDOM from 'react-dom/client';
import createBrowserRouter from './ArtSpaceApplication/mainPage.js'
import reportWebVitals from './reportWebVitals.js';
import{
    RouterProvider,
  } from "react-router-dom";

import './index.css';

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
