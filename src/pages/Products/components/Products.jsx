import React from 'react'
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { number } from 'yup';

function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [searchProduct, setSearchProduct] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // const [nPage,setNpage] = useState(0);

  const getProducts = async (page) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4`);
      setProducts(data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  const getSearchProduct = async (searchProduct) => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=9&search=${searchProduct}`);
      setProducts(result.data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  }
  const getSortItems = async (sortby) => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=9&sort=${sortby}`);
      setProducts(result.data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  }
  const getSearchProductByPrice = async (min, max) => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=9&finalPrice[gte]=${min}&finalPrice[lte]=${max}`);
      setProducts(result.data.products);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  }
  if (loader) {
    return <Loader />;
  }
  const handleChange = (e) => {
    setSearchProduct(e.target.value);
  }
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className='d-flex flex-wrap justify-content-start align-items-center gap-5 mb-5'>
            <div className="dropdown">
              <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort By
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => { getSortItems("") }}>Default</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("finalPrice") }}>Final Price with discount</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("-finalPrice") }}>-Final Price with discount</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("discount") }}>Discount</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("-discount") }}>-Discount</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("name") }}>Name</button></li>
                <li><button className="dropdown-item" onClick={() => { getSortItems("-name") }}>-Name</button></li>
              </ul>
            </div>
            <div className='d-flex column-gap-2'>
              <input
                type="text"
                placeholder="Search for product :"
                className="w-100"
                value={searchProduct}
                onChange={handleChange}
              />
              <button type='button' className='btn btn-outline-info ' onClick={() => { getSearchProduct(searchProduct) }}>search</button>
            </div>
            <div className='d-flex column-gap-2'>
              <input
                type="text"
                placeholder="Min Price :"
                className="w-25"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Max Price :"
                className="w-25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button type='button' className='btn btn-outline-info ' onClick={() => { getSearchProductByPrice(minPrice, maxPrice) }}>Go</button>
            </div>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <div className='me-auto'>
              <h2>All Products</h2>
            </div>
          </div>
          <div className='d-flex flex-column gap-5'>
            <div className="d-flex flex-wrap gap-3">
              {(products.length > 0) ? products.map((product) => (
                <NavLink className="text-decoration-none" to={`/Product/${product._id}`} key={product._id}>
                  <div
                    className="card"
                    style={{ width: "10rem", height: "18rem" }}
                  >
                    <img
                      src={product.mainImage.secure_url}
                      className="card-img-top p-2"
                      alt={product.name}
                    />
                    <h6 className="text-capitalize text-center">{product.name}</h6>
                  </div>
                </NavLink>
              )) : 'No Products'}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#" onClick={() => (getProducts(1))}>1</a></li>
                <li className="page-item"><a className="page-link" href="#" onClick={() => (getProducts(2))}>2</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </>
  );
}

export default Products