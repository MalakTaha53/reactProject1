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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/ProductsWithCategory/:id",
        element: <ProductsWithCategory />,
      },
      {
        path: "/product/:id",
        element: <Product />,
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
      <RouterProvider router={router} />
    </>
  )
}

export default App
