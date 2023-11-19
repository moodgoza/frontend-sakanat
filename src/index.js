import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Login from "./page/login/Login"
import MainPage from './page/mainPage/MainPage';
import Navbar from './component/Navbar/Navbar';
import Register from './page/register/Register';
import Chat from './page/chat/Chat';

import { Provider } from "react-redux";
import {store} from "./store";
import Items from './page/item/Items';
import ItemDetails from './page/item/ItemDetails';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/item",
    element: <Items />,
  },
  {
    path: "/item/:itemId",
    element: <ItemDetails />,
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Navbar/>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
