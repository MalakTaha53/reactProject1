import React from 'react'
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
      setProducts(data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  };
  const getSearchProduct = async () => {
    try {
      const { result } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${searchProduct}`);
      setProducts(result.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getSearchProduct();
  }, [searchProduct]);
  if (loader) {
    return <Loader />;
  }
  const handleChange = (e) => {
    setSearchProduct(e.target.value);
  };
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex justify-content-between pb-3">
            <h2>All Products</h2>
            <input
              type="text"
              placeholder="Search for specific product :  "
              className="w-25"
              value={searchProduct}
              onChange={handleChange}
            />
          </div>
          <div className="row row-gap-2">
            {products.map((product) => (
              <NavLink className="text-decoration-none col-2" to="/Products/{product._id}">
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products