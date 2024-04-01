import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { Bounce, Slide, toast } from 'react-toastify';

function ForgotPassword() {
  const [userPassword, setUserPassword] = useState({
    email: '',
    password: '',
    code: '',
  })
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, {
        email: userPassword.email,
        password: userPassword.password,
        code: userPassword.code
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
        navigate('/signin');
      }
    } catch (error) {
      toast.error('Please check your information', {
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
              <h2 className="fst-italic text-center pb-3">Please Enter Your Information</h2>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={userPassword.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userPassword" className="form-label">User Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" value={userPassword.password} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userCode" className="form-label">User Code</label>
                <input type="text" className="form-control" id="userCode" name="code" value={userPassword.code} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loader ? 'disabled' : null}>{!loader ? 'Save' : 'wait...'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword