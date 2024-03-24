import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader';
import { useEffect } from 'react'
import { Bounce, Slide, toast } from 'react-toastify';

function Cart() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);

  const getCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers:
        {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts(data.products);
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
  }, [products]);
  if (loader) {
    return <Loader />;
  }
  const continueShopping = () => {
    navigate('/products');
  }
  const removeItem = async (productId) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, { productId }, {
      headers:
      {
        Authorization: `Tariq__${token}`
      }
    });
    if (data.message == 'success') {
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
  }
  const clearCart = async () => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {}, {
      headers:
      {
        Authorization: `Tariq__${token}`
      }
    });
    if (data.message == 'success') {
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
    navigate('/order');
  }
  const increase = async (productId) => {
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
          console.log(product);
          const count = product.quantity + 1;
          updatedProducts.push({
            ...product, quantity: count, details: { ...product.details, finalPrice: (product.details.finalPrice) * count }
          });
        } else {
          updatedProducts.push(product);
        }
      })
      console.log(updatedProducts);
      setProducts(updatedProducts);
      if (data.message == 'success') {
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
        navigate('/cart');
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
            decreaseQuantity(updatedQuantity);
            updatedProducts.push({ ...product, quantity: updatedQuantity, finalPrice: (product.details.finalPrice) * updatedQuantity });
          } else {
            updatedProducts.push(product);
          }
        } else {
          updatedProducts.push(product);
        }
      })
      console.log(updatedProducts);
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
                  <div className='col-6'>
                    <div className='d-flex align-items-center'>
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
                  <div className='col-2'>
                    <button onClick={() => increase(product.details._id)} className='btn btn-outline-success border border-black rounded  border-2 pt-2 pb-2'>+</button>
                    <span className='ms-2 me-2'>Quantity</span>
                    <button onClick={() => decrease(product.details._id)} className='btn btn-outline-success border border-black rounded  border-2 pt-2 pb-2'>-</button>
                  </div>
                  <div className='col-2'>
                    <div><span>Price : {product.details.finalPrice}</span><span>$ </span></div>
                    <div><span>{product.details.price}$ </span><span>each</span></div>
                  </div>
                  <div className='col-2'>
                    <button onClick={() => removeItem(product.details._id)} className='btn btn-outline-danger border border-black rounded fw-bold border-3 pt-2 pb-2'>Remove</button>
                  </div>
                </div>
              ))}
              <hr className='pb-3'></hr>
              <div className='d-flex justify-content-between align-items-center'>
                <button onClick={clearCart} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25'>Clear Cart</button>
                <button onClick={continueShopping} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25'>Continue Shopping</button>
                <button onClick={purchase} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25'>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
