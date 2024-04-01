import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader';
import { useEffect } from 'react'
import { Bounce, Slide, toast } from 'react-toastify';
import { CartContext } from '../../../context/Cart';
import Products from '../../Products/components/Products';

function Cart() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  const getCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers:
        {
          Authorization: `Tariq__${token}`
        }
      });
      const updatedProducts = [];
      data.products.map((product) => {
        if (product.quantity > 1) {
          const count = product.quantity;
          updatedProducts.push({
            ...product, details: { ...product.details, finalPrice: (product.details.finalPrice) * count }
          });
        } else {
          updatedProducts.push(product);
        }
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
  const continueShopping = () => {
    navigate('/products');
  }
  const removeItem = async (productId) => {
    setLoad(true);
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, { productId }, {
        headers:
        {
          Authorization: `Tariq__${token}`
        }
      });
      if (data.message == 'success') {
        setLoad(false);
        setProducts(prev => {
          return prev.filter(item => item.productId !== productId);
        })
        toast.success('remove item successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        navigate('/cart');
      }
    } catch (e) {
      setError("error to load data");
    } finally {
      setLoad(false);
    }

  }
  const clearCart = async () => {
    setLoad(true);
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {}, {
      headers:
      {
        Authorization: `Tariq__${token}`
      }
    });
    if (data.message == 'success') {
      setProducts([]);
      setLoad(false);
      toast.success('remove all items done', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      navigate('/cart');
    }
  }
  const purchase = () => {
    setLoad(true);
    const token = localStorage.getItem('userToken');
    if (token != null) {
      setLoad(false);
      navigate('/order');
    }
  }
  const increase = async (productId) => {
    setLoad(true);
    const token = localStorage.getItem('userToken');
    if (token != null) {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId },
        {
          headers:
          {
            Authorization: `Tariq__${token}`
          }
        })
      const updatedProducts = [];
      products.map((product) => {
        if (productId === product.productId) {
          const count = product.quantity + 1;
          updatedProducts.push({
            ...product, quantity: count, details: { ...product.details, finalPrice: (product.details.finalPrice) + (product.details.price) }
          });
        } else {
          updatedProducts.push(product);
        }
      })
      setProducts(updatedProducts);
      if (data.message == 'success') {
        setLoad(false);
        toast.success('increase # of item successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
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
  }
  const decrease = async (productId) => {
    setLoad(true);
    const token = localStorage.getItem('userToken');
    const decreaseQuantity = async () => {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId },
        {
          headers:
          {
            Authorization: `Tariq__${token}`
          }
        })
      if (data.message == 'success') {
        setLoad(false);
        toast.success('decrese # of item successfully', {
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
      }
    }
    if (token != null) {
      const updatedProducts = [];
      products.map((product) => {
        if (productId === product.productId) {
          const updatedQuantity = product.quantity - 1;
          if (updatedQuantity > 0) {
            decreaseQuantity();
            updatedProducts.push({
              ...product, quantity: updatedQuantity, details: { ...product.details, finalPrice: (product.details.finalPrice) - (product.details.price) }
            });
          } else {
            updatedProducts.push(product);
          }
        } else {
          updatedProducts.push(product);
        }
      })
      setProducts(updatedProducts);
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
  }
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="pt-4 pb-4 bg-secondary-subtle">
        <div className="container">
          <div>
            <div>
              <h1>Shopping Cart</h1>
            </div>
            <div className='bg-light p-5'>
              {products.map((product) => (
                <div className='row mb-4' key={product.details._id}>
                  <div className='col-lg-6 col-sm-12'>
                    <div className='d-flex justify-content-start align-items-center'>
                      <div className='d-flex align-items-center col-8'>
                        <img
                          src={product.details.mainImage.secure_url}
                          className='w-25 h-25 object-fit-cover border rounded'
                          alt={product.details.name}
                        />
                        <div className='align-self-start ms-2'>
                          <h3 className='fs-6 fw-medium'>{product.details.name}</h3>
                        </div>
                      </div>
                      <div className='col-2 align-self-start'>
                        <span>Quantity : {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-2 col-sm-12'>
                    <button onClick={() => increase(product.details._id)} className='btn btn-outline-success border border-black rounded  border-2 pt-2 pb-2' disabled={load ? 'disabled' : null}>{!load ? "+" : "..."}</button>
                    <span className='ms-2 me-2'>Quantity</span>
                    <button onClick={() => decrease(product.details._id)} className='btn btn-outline-success border border-black rounded  border-2 pt-2 pb-2' disabled={load ? 'disabled' : null}>{!load ? "-" : "..."}</button>
                  </div>
                  <div className='col-lg-2 col-sm-12'>
                    <div><span>Price : {product.details.finalPrice}</span><span>$ </span></div>
                    <div><span>{product.details.price}$ </span><span>each</span></div>
                  </div>
                  <div className='col-lg-2 col-sm-12'>
                    <button onClick={() => removeItem(product.details._id)} className='btn btn-outline-danger border border-black rounded fw-bold border-3 pt-2 pb-2' disabled={load ? 'disabled' : null}>{!load ? "Remove" : "wait ..."}</button>
                  </div>
                </div>
              ))}
              <hr className='pb-3'></hr>
              <div className='d-flex justify-content-between align-items-center'>
                <button onClick={clearCart} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25' disabled={load ? 'disabled' : null}>{!load ? "Clear Cart" : "wait ..."}</button>
                <button onClick={continueShopping} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25' disabled={load ? 'disabled' : null}>{!load ? "Continue Shopping" : "wait ..."}</button>
                <button onClick={purchase} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25' disabled={load ? 'disabled' : null}>{!load ? "Purchase" : "wait ..."}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
