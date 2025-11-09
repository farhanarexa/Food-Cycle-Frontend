import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Root from './Layout/Root.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/Home.jsx';
import AllProducts from './components/AllProducts.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import Login from './Components/LoginRegister/Login.jsx';
import Register from './Components/LoginRegister/Register.jsx';
import MyProducts from './components/MyProducts.jsx';
import MyBids from './components/MyBids.jsx';
import CreateProduct from './Components/CreateProduct.jsx';

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
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "myProducts",
        Component: MyProducts,
      },
      {
        path: "myBids",
        Component: MyBids,
      },
      {
        path: "createProducts",
        Component: CreateProduct,
      },
      {
        path: "login",
        Component: Login,
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
