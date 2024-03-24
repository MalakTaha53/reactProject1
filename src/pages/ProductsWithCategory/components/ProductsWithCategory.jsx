import React, { useEffect } from 'react';
import { useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";

function ProductsWithCategory() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  const getProductsWithCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
      setProducts(data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProductsWithCategories();
  }, []);
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="pb-3">
            <h2>All Products </h2>
          </div>
          <div className="row row-gap-2">
            {(products.length > 0) ? products.map((product) => (
              <NavLink className="text-decoration-none col-2" to={`/product/${product._id}`} key={product._id}>
                <div
                  className="card"
                  style={{ width: "10rem", height: "18rem" }}
                  key={product._id}
                >
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top p-2"
                    alt={product.name}
                  />
                  <h6 className="text-capitalize text-center ">{product.name}</h6>
                </div>
              </NavLink>
            )) : <h3 className='text-center'>No Products in this Category </h3>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsWithCategory