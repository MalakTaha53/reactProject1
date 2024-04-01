import React, { useEffect, useState } from 'react'
import Loader from "../../../components/Loader/Loader.jsx";
import axios from 'axios';
import { Bounce, Slide, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom'

function Profile() {
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
    role: '',
  });
  const [userOrders, setUserOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
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
  const getOrder = async () => {
    const token = localStorage.getItem('userToken');
    if (token != null) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
        setUserOrders(data.orders);
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
  const displayProducts = (orderID) => {
    userOrders.find((order) => {
      if (order._id === orderID) {
        setOrderProducts(order.products);
      }
    })
  }
  useEffect(() => {
    getProfile();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-secondary-subtle pt-5 pb-5">
        <div className="container">
          <div className='d-flex flax-wrap justify-content-start align-items-start column-gap-5'>
            <div className='bg-secondary-subtle border border-dark-subtle border-2 rounded w-25 vh-100 d-flex flex-column p-3 row-gap-3 shadow p-3 mb-5 bg-body-tertiary rounded'>
              <NavLink className="navbar-brand text-uppercase fw-bold text-white" to="/"><span className="text-warning">M</span><span className="text-primary">o</span><span className="text-success">o</span><span className="text-danger">n</span></NavLink>
              <button type="button" className="btn btn-outline-dark" onClick={() => { getProfile() }}>View Profile</button>
              <button type="button" className="btn btn-outline-dark" onClick={() => { getOrder() }}>View Orders</button>
            </div>
            <div>
              {(userProfile != null) ? 
                <div className='d-flex flex-column gap-5'>
                  <img
                    src={userProfile.image.secure_url}
                    alt="{userProfile.name}"
                    className='w-25 h-25 border border-black border-2 rounded-5' />
                  <div className='d-flex flex-column'>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label">User Name</label>
                      <input type="text" className="form-control w-50" id="userName" name="userName" value={userProfile.userName} readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="userEmail" className="form-label">User Email</label>
                      <input type="email" className="form-control w-50" id="userEmail" name="email" value={userProfile.email} readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="userPassword" className="form-label">User Password</label>
                      <input type="password" className="form-control w-50" id="userPassword" name="password" value={userProfile.password} readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="userRole" className="form-label">User Role</label>
                      <input type="text" className="form-control w-50" id="userRole" name="userRole" value={userProfile.role} readOnly />
                    </div>
                  </div>
                </div>
                : ''}
              <hr className="pb-3"></hr>
              {(userOrders.length > 0) ?
                <table className="table table-secondary">
                  <thead>
                    <tr>
                      <th scope="col">couponName</th>
                      <th scope="col">phoneNumber</th>
                      <th scope="col">address</th>
                      <th scope="col">finalPrice</th>
                      <th scope="col">paymentType</th>
                      <th scope="col">status</th>
                      <th scope="col">products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.couponName}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.address}</td>
                        <td>{order.finalPrice}$</td>
                        <td>{order.paymentType}</td>
                        <td>{order.status}</td>
                        <td><button type="button" className="btn btn-outline-success" onClick={() => displayProducts(order._id)}>View Products</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                : ''}
              <div className='d-flex flex-wrap gap-1'>
                {(orderProducts.length > 0) ? orderProducts.map((product) =>
                  <div className="card" style={{ width: '18rem' }}>
                    <div className='w-auto h-100'>
                      <img src={product.productId.mainImage.secure_url} className="card-img-top object-fit-cover border rounded mt-2 " alt={product.productId.name} />

                    </div>
                    <div className="card-body">
                      <h6 className="card-title">Name :{product.productId.name}</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><span>Quantity :</span> {product.quantity}</li>
                      <li className="list-group-item"><span>Unit Price :</span> {product.unitPrice}$</li>
                      <li className="list-group-item"><span>Final Price :</span> {product.finalPrice}$</li>
                    </ul>
                  </div>
                ) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile