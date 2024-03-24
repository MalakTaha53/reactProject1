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
  const { id } = useParams();
  const navigate = useNavigate();

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
  useEffect(() => {
    getProductDetails();
  }, []);
  if (loader) {
    return <Loader />;
  }
  const AddToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
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
  const createReview = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (token != null) {
      console.log(comment);
      console.log(rating);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/656afed9415e5e5f8d84871f/review`,
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
      console.log("data = ", data);
      // if (data.message == 'success') {
      //   toast.success('SingIn successfully', {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //     transition: Slide,
      //   });
      // }
    } else {
      navigate('/signin');
    }
  }

  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex flex-column row-gap-3">
            <div className='shadow p-3 bg-body-tertiary rounded'>
              <h2 className='text-center text-capitalize fst-italic'>{product.name}</h2>
            </div>
            <div className='row column-gap-3'>
              <div className='col-6 w-50 h25'>
                <img
                  src={product.mainImage.secure_url}
                  className="object-fit-cover border rounded me-5"
                  alt={product.name}
                />
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
              <button onClick={() => AddToCart(product._id)} className='btn btn-outline-primary border border-black rounded fw-bold border-3 pt-2 pb-2 w-25'>Add to Cart</button>
            </div>
            <button className="btn btn-primary border border-black rounded fw-bold border-3 w-25 pt-2 pb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Create Review</button>
            <div className="offcanvas offcanvas-top h-50" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Write Your Review</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div className="mb-3">
                  <label for="userComment" className="form-label">Comment</label>
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
                <button onClick={() => createReview(product._id)} className='btn btn-outline-primary border border-black rounded fw-bold border-3 w-25'>Submit</button>
              </div>
            </div>
            <div>
              <h3>Feedback: </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product