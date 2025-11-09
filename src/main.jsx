import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Root from './Layout/Root.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthProvider from './Contexts/AuthProvider.jsx';
import Login from './Components/LoginRegister/Login.jsx';
import Register from './Components/LoginRegister/Register.jsx';
import Home from './Components/Home.jsx';
import AvaiableFoods from './Components/AvaiableFoods.jsx';
import AddFoods from './Components/AddFoods.jsx';
import ManageMyFoods from './Components/ManageMyFoods.jsx';
import MyFoodRequests from './Components/MyFoodRequests.jsx';
import PrivateRoute from './Components/LoginRegister/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "availableFoods",
        Component: AvaiableFoods
      },
      {
        path: "addFood",
        element: <PrivateRoute><AddFoods /></PrivateRoute>
      },
      {
        path: "manageMyFoods",
        element: <PrivateRoute><ManageMyFoods /></PrivateRoute>
      },
      {
        path: "myFoodRequests",
        element: <PrivateRoute><MyFoodRequests /></PrivateRoute>
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register,
      },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
