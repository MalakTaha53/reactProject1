import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import CartContextProvider from '../context/Cart.jsx'

function Root() {
  return (
    <>
      <CartContextProvider>
        <Navbar />
      </CartContextProvider>
      <Outlet />
      <Footer />
    </>
  )
}

export default Root