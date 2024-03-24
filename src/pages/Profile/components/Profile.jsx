import React, { useEffect, useState } from 'react'
import Loader from "../../../components/Loader/Loader.jsx";
import axios from 'axios';
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
    role: '',
  });
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    const token = localStorage.getItem('userToken');
    if (token != null) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
        console.log(data.user);
        const { userName, email, password, image, role } = data.user;
        const pass = localStorage.getItem('password');
        const user = {
          userName: userName,
          email: email,
          password: pass,
          image: image,
          role: role,
        };
        setUserProfile(user)
        setError("");
      } catch (error) {
        setError("Error To Load Data");
      } finally {
        setLoader(false);
      }
    } else {
      toast.error('Please Signin ! ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      navigate('/signin')
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (loader) {
    return <Loader />;
  }
  const handleChangeImage = () => {

  }
  const handleChange = () => {

  }
  return (
    <>
      <div className="bg-secondary-subtle pt-5 pb-5">
        <div className="container">
          <h1 className='text-center mb-4'>My Profile</h1>
          <div className='d-flex align-items-center justify-content-center column-gap-5'>
            <img
              src={userProfile.image.secure_url}
              alt="{userProfile.name}"
              className='w-25 h-25 border border-black border-2 rounded-5' />
            <div>
              <div className="mb-3">
                <label for="userName" className="form-label">User Name</label>
                <input type="text" className="form-control" id="userName" name="userName" value={userProfile.userName} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={userProfile.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userPassword" className="form-label">User Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" value={userProfile.password} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userRole" className="form-label">User Role</label>
                <input type="text" className="form-control" id="userRole" name="userRole" value={userProfile.role} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile