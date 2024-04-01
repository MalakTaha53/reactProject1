import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { Bounce, Slide, toast } from 'react-toastify';

function SendCode() {
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, {
        email: email
      });
      if (data.message == 'success') {
        toast.success('Send code successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        navigate('/forgotpassword');
      }
    } catch (error) {
      toast.error('Please check your email', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  }
  return (
    <>
      <div className="bg-secondary-subtle pt-5 pb-5">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="w-50 border border-2 rounded p-2 border-black shadow-lg p-3 mb-5 bg-body-tertiary rounded">
              <h2 className="fst-italic text-center pb-3">Please Enter Your Email</h2>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={email} onChange={(e) => {
                  setEmail(e.target.value);
                }} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loader ? 'disabled' : null}>{!loader ? 'Send Code' : 'wait...'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SendCode