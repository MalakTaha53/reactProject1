import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";
import { Bounce, Slide, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import Style from "../components/Product.module.css";

function Product() {
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProduct(data.product);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
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
  useEffect(() => {
    getProductDetails();
    getOrder();
  }, []);
  if (loader) {
    return <Loader />;
  }
  const AddToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    setLoad(true);
    if (token != null) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
          { productId },
          {
            headers:
            {
              Authorization: `Tariq__${token}`
            }
          })
        if (data.message == 'success') {
          toast.success('Add item successfully', {
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
          navigate('/cart');
        }
      } catch (error) {
        toast.success('product already exists', {
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
      } finally {
        setLoad(false);
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
  const createReview = (productId) => {
    setLoad(true);
    userOrders.map((order) => {
      if (order.status == 'deliverd') {
        order.products.map((product) => {
          if (product.productId._id == productId) {
            reviewContext(productId);
          }
        })
      }
    })
    toast.error('cannot create a review before receiving this product', {
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
  }
  const reviewContext = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (token != null) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,
          {
            comment: comment,
            rating: rating
          },
          {
            headers:
            {
              Authorization: `Tariq__${token}`
            }
          })
        if (data.message == 'success') {
          toast.success('creat review successfully', {
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
        } else {
          toast.success('already review successfully', {
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
        }
      } catch (e) {
        setError("error to create review");
      } finally {
        setLoad(false);
      }
    } else {
      navigate('/signin');
    }
  }
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex flex-column row-gap-3" >
            <div className='shadow p-3 bg-body-tertiary rounded'>
              <h2 className='text-center text-capitalize fst-italic'>{product.name}</h2>
            </div>
            <div className='row column-gap-3'>
              <div className='col-6 w-50 h25'>
                <div className='position-relative'>
                  <img
                    src={product.mainImage.secure_url}
                    className="border rounded"
                    alt={product.name}
                  />
                  <span className='p-2 m-1 bg-info position-absolute top-0 start-0 rounded'>Stock : {product.stock}</span>
                </div>
              </div>
              <div className='col-6 w-25 h-25'>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                >
                  {product.subImages.map((sub) => (
                    <SwiperSlide>
                      <img
                        src={sub.secure_url}
                        className="object-fit-cover border rounded"
                        alt={product.name}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <p className='lh-base text-black'>{product.description}</p>
            <div className='d-flex justify-content-between align-items-center w-50'>
              <span>Price : {product.price}</span>
              <span>Discount : {product.discount}</span>
              <span>Final Price : {product.finalPrice}</span>
            </div>
            <div className='d-flex justify-content-start align-items-center column-gap-5'>
              <button onClick={() => AddToCart(product._id)} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25' disabled={load ? 'disabled' : null}>{!load ? "Add to Cart" : "wait ..."}</button>
            </div>
            <button className="btn btn-primary border border-black rounded fw-bold border-3 w-25 pt-2 pb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Create Review</button>
            <div className="offcanvas offcanvas-top h-50" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Write Your Review</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="mb-3">
                  <label htmlFor="userComment" className="form-label">Comment</label>
                  <input type="text" className="form-control" id="userComment" name="userComment" onChange={(e) => setComment(e.target.value)} />
                </div>
                <div className="d-flex mb-3">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label>
                        <input type='radio' name='rating' value={currentRating} onClick={() => setRating(currentRating)} />
                        <FaStar className={Style.star} size={50}
                          color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                      </label>
                    )
                  })}
                </div>
                <button onClick={() => createReview(product._id)} className='btn btn-outline-primary border border-black rounded fw-bold border-3 w-25' disabled={load ? 'disabled' : null}>{!load ? "Submit" : "wait ..."}</button>
              </div>
            </div>
            <div>
              <h3>Feedback: </h3>
              <div>
                <div className="row row-gap-3">
                  {product.reviews.map((review) => {
                    return (
                      <div className='col-3' key={review._id}>
                        <div className="card" style={{ width: '18rem' }}>
                          <div className="card-body">
                            <h5 className="card-title">{review.createdBy.userName}</h5>
                            <p className="card-text">{review.createdBy.email}</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span>Comment : </span>{review.comment}</li>
                            <li className="list-group-item"><span>Rating : </span>{review.rating}</li>
                            <li className="list-group-item">
                              <div className="d-flex mb-3">
                                {[...Array(5)].map((star, index) => {
                                  const rating = review.rating;
                                  const currentRating = index + 1;
                                  return (
                                    <label>
                                      <FaStar className={Style.star} size={50}
                                        color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
                                      />
                                    </label>
                                  )
                                })}
                              </div>
                            </li>
                          </ul>
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product