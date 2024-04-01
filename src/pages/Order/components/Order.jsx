import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { Bounce, Slide, toast } from 'react-toastify';

function Order() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    couponName: "",
    address: "",
    phone: "",
  });
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      const updatedProducts = [];
      data.products.map((product) => {
        const count = product.quantity;
        updatedProducts.push({
          ...product, details: { ...product.details, finalPrice: (product.details.finalPrice) * count }
        });
      })
      setProducts(updatedProducts);
    } catch (error) {
      toast.error(error, {
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
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const createOrder = async () => {
    setLoad(true);
    if (order.address === '') {
      toast.error("please enter your address", {
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
    } else if (order.phone === '') {
      toast.error("please enter your phone number", {
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
    } else {
      const token = localStorage.getItem("userToken");
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
          couponName: order.couponName,
          address: order.address,
          phone: order.phone,
        }, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        })
        if (data.message == 'success') {
          setLoad(false);
          toast.success('order created successfully', {
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
          navigate('/profile');
        }
        setError("");
      } catch (error) {
        setError("Error To Load Data");
      } finally {
        setLoader(false);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="pt-4 pb-4 bg-secondary-subtle">
        <div className="container">
          <h1 className="pb-3">Create Order</h1>
          <div className="d-flex flex-column bg-light p-5">
            {products.map((product) => (
              <div className="row mb-4" key={product.details._id}>
                <div className="col-6">
                  <div className="d-flex flex-wrap align-items-center">
                    <img
                      src={product.details.mainImage.secure_url}
                      className="w-25 h-25 object-fit-cover border rounded"
                      alt={product.details.name}
                    />
                    <h3 className="align-self-start fs-6 fw-medium">
                      {product.details.name}
                    </h3>

                  </div>
                </div>
                <div className="col-3">
                  <span>Quantity : {product.quantity}</span>
                </div>
                <div className="col-3">
                  <div>
                    <span>Price : {product.details.finalPrice}</span>
                    <span>$ </span>
                  </div>
                  <div>
                    <span>{product.details.price}$ </span>
                    <span>each</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="pb-3"></hr>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-3 w-50">
              <label htmlFor="couponName" className="form-label">
                Coupon Name
              </label>
              <input
                type="text"
                className="form-control"
                id="couponName"
                name="couponName"
                value={order.couponName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={order.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={order.phone}
                onChange={handleChange}
                required
              />
            </div>
            <button
              onClick={createOrder}
              className="btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-50"
              disabled={load ? 'disabled' : null}>{!load ? "Order " : "wait ..."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
