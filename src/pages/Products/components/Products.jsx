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
  const [paginationLinks, setPaginationLinks] = useState("");

  const getProducts = async (page) => {
    console.log(page);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=10`);
      const numberOfPages = data.page;
      let Links = `<li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
      </li>`;
      for (var i = 1; i < numberOfPages; i++) {
        Links += `<li class="page-item"><button class="page-link" onclick=getProducts(${i})>${i}</button></li>`;
      }
      Links += `<li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
      </li>`;
      setPaginationLinks(Links);
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
    getProducts(1);
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
              <NavLink className="text-decoration-none col-2" to={`/Product/${product._id}`} key={product._id}>
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
            ))}
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products