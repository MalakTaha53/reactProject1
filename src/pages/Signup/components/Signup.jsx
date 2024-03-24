import axios from "axios";
import React, { useState } from "react";
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0]
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    if (validate) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
        })
        if (data.message == 'success') {
          toast.success('your account created successfully', {
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
          navigate('/signin');
        }
      } catch (error) {
        if (error.response.status === 409) {
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
        }
      }finally{
        setLoader(false);
      }
    }
  }
  const validateData = async () => {
    const signupSchema = object({
      userName: string().min(3).max(25).required(),
      email: string().email().required(),
      password: string().min(8).max(25).required(),
      image: string().required(),
    })
    try {
      await signupSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  }
  return (
    <>
      <div className="bg-secondary-subtle pt-5 pb-5">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">{errors.length > 0 ? errors.map(error =>
            <div className="bg-danger rounded w-50 m-1"><p className="p-2">{error}</p></div>) : ''}</div>
          <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="w-50 border border-2 rounded p-2 border-black shadow-lg p-3 mb-5 bg-body-tertiary rounded">
              <h2 className="fst-italic text-center pb-3">Sing Up</h2>
              <div className="mb-3">
                <label for="userName" className="form-label">User Name</label>
                <input type="text" className="form-control" id="userName" name="userName" value={user.userName} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={user.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userPassword" className="form-label">User Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" value={user.password} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userImage" className="form-label">User Image</label>
                <input type="file" className="form-control" id="userImage" name="image" onChange={handleChangeImage} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loader?'disabled':null}>{!loader?'Sing Up':'wait...'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
