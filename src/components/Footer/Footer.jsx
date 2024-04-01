import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context/User';
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { GiPositionMarker } from "react-icons/gi";
import { IoMoonSharp } from "react-icons/io5";

function Footer() {

  return (
    <>
      <div className='bg-body-tertiary'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center flex-wrap'>
            <div className='d-flex align-items-center column-gap-3'>
              <IoMoonSharp size={40} />
              <NavLink className="text-uppercase fw-bold text-decoration-none" to="/"><span className="text-warning">M</span><span className="text-primary">o</span><span className="text-success">o</span><span className="text-danger">n</span><span className='text-light-emphasis'> Shop</span></NavLink>
            </div>
            <div className="mt-5 p-5 d-flex-column shadow-lg p-3 mb-5 bg-body-tertiary rounded">
              <div className='d-flex column-gap-3 pb-2'>
                <MdEmail size={30} />
                <p>malak.mohammad.taha@gmail.com</p>
              </div>
              <div className='d-flex column-gap-3 pb-2'>
                <IoMdCall size={30} />
                <p>+972 532331140</p>
              </div>
              <div className='d-flex column-gap-3'>
                <GiPositionMarker size={30} />
                <p>Jerusalem</p>
              </div>
            </div>
          </div>

          <hr className="pb-3"></hr>
          <div className='text-center pb-3'>
            <p>© 2024 - Malak M Taha</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer