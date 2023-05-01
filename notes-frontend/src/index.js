import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { getUserData } from './utils/UserUtil';
import MainPage from './pages/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: getUserData() === null ? <Home /> : <MainPage />,
  },
  {
    path: "/auth/register",
    element: getUserData() === null ? <RegisterPage /> : <Navigate to={"/"} />,
  },
  {
    path: "/auth/login",
    element: getUserData() === null ? <LoginPage /> : <Navigate to={"/"} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
