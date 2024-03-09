import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";

function Product() {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
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
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex flex-column row-gap-3">
            <div className='shadow p-3 bg-body-tertiary rounded'>
              <h2 className='text-center text-capitalize fst-italic'>{product.name}</h2>
            </div>
            <img
              src={product.mainImage.secure_url}
              className="w-25 h-25 object-fit-cover border rounded"
              alt={product.name}
            />
            <p className='lh-base text-black'>{product.description}</p>
            <div className='d-flex justify-content-between align-items-center w-50'>
              <span>Price : {product.price}</span>
              <span>Discount : {product.discount}</span>
              <span>Final Price : {product.finalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product