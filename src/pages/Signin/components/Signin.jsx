import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../../../context/User';

function Signin() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    if (validate) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, { email: user.email, password: user.password });
        setUser({
          email: '',
          password: '',
        })
        if (data.message == 'success') {
          toast.success('SingIn successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          localStorage.setItem('userToken', data.token);
          setUserToken(data.token);
          if (rememberMe) {
            localStorage.setItem('email', user.email);
            localStorage.setItem('password', user.password);
            localStorage.setItem('rememberMe', true);
          }
          navigate('/');
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
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
  }
  const validateData = async () => {
    const signinSchema = object({
      email: string().email().required(),
      password: string().min(8).max(25).required(),
    })
    try {
      await signinSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  }
  const changeCheckbox = (e) => {
    setRememberMe(e.target.checked);
  }
  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const rememberMe = localStorage.getItem('rememberMe');
    if (email != null && password != null) {
      setUser({
        email: email,
        password: password
      })
      setRememberMe(true);
    }
  }, [])
  return (
    <>
      <div className="bg-secondary-subtle pt-5 pb-5">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">{errors.length > 0 ? errors.map(error =>
            <div className="bg-danger rounded w-50 m-1"><p className="p-2">{error}</p></div>) : ''}</div>
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="w-50 border border-2 rounded p-2 border-black shadow-lg p-4 mb-5 bg-body-tertiary rounded">
              <h2 className="fst-italic text-center pb-3">Sing In</h2>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={user.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userPassword" className="form-label">User Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" value={user.password} onChange={handleChange} />
              </div>
              <div className='d-flex justify-content-between align-items-center mb-3 mt-5'>
                <div>
                  <input class="form-check-input" type="checkbox" checked={rememberMe} id="flexCheckDefault" onChange={changeCheckbox}></input>
                  <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <NavLink className="text-decoration-none" to='/sendcode'>Forget Password?</NavLink>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loader ? 'disabled' : null}>{!loader ? 'Sing In' : 'wait...'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin