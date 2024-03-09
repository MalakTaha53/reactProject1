import React, { useState } from 'react';
import axios from "axios";
import { object, string } from 'yup';

function Signin() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await validateData();
    if (validate) {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, { email: user.email, password: user.password });
      console.log(data);
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
            <form onSubmit={handleSubmit} className="border border-2 rounded p-2 border-black shadow-lg p-4 mb-5 bg-body-tertiary rounded">
              <h2 className="fst-italic text-center pb-3">Sing In</h2>
              <div className="mb-3">
                <label for="userEmail" className="form-label">User Email</label>
                <input type="email" className="form-control" id="userEmail" name="email" value={user.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label for="userPassword" className="form-label">User Password</label>
                <input type="password" className="form-control" id="userPassword" name="password" value={user.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sing In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin