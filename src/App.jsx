import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Root from './routes/Root.jsx'
import Home from './pages/Home/components/Home.jsx'
import Signup from './pages/Signup/components/Signup.jsx'
import Signin from './pages/Signin/components/Signin.jsx'
import Categories from './pages/Categories/components/Categories.jsx'
import Products from './pages/Products/components/Products.jsx'
import Product from './pages/Product/components/Product.jsx'
import Cart from './pages/Cart/components/Cart.jsx'
import ProductsWithCategory from './pages/ProductsWithCategory/components/ProductsWithCategory.jsx'
import NotFound from './pages/NotFound/components/NotFound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from './auth/ProtectedRoutes/ProtectedRoutes.jsx'
import NotProtectedRoutes from './auth/NotProtectedRoutes/NotProtectedRoutes.jsx'
import UserContextProvider from './context/User.jsx'
import Profile from './pages/Profile/components/Profile.jsx'
import SendCode from './pages/SendCode/components/SendCode.jsx'
import ForgotPassword from './pages/ForgotPassword/components/ForgotPassword.jsx'
import Order from './pages/Order/components/Order.jsx'
import CartContextProvider from './context/Cart.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element:
          <NotProtectedRoutes>
            <Signup />
          </NotProtectedRoutes>
        ,
      },
      {
        path: "/signin",
        element:
          <NotProtectedRoutes>
            <Signin />
          </NotProtectedRoutes>
        ,
      },
      {
        path: "/sendcode",
        element: <SendCode />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/profile",
        element: <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
        ,
      },
      {
        path: "/cart",
        element:
          <ProtectedRoutes>
            <CartContextProvider>
              <Cart />
            </CartContextProvider>
          </ProtectedRoutes>
        ,
      },
      {
        path: "/ProductsWithCategory/:id",
        element: <ProductsWithCategory />,
      },
      {
        path: "/Product/:id",
        element: <Product />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
