import React from "react";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import axios from "axios";
import ProductsWithCategory from "../../ProductsWithCategory/components/ProductsWithCategory.jsx"
import { NavLink } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
      setCategories(data.categories);
      setError("");
    } catch (error) {
      setError("Error To Load Data");
    } finally {
      setLoader(false);
    }
  };
  const getSearchProducts = async () => {
    try {
      const { result } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${searchCategory}`);
      console.log(result.Categories);
      setCategories(result.categories);
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
    getSearchProducts();
  }, [searchCategory]);
  if (loader) {
    return <Loader />;
  }
  const handleChange = (e) => {
    setSearchCategory(e.target.value);
  };
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex justify-content-between pb-3">
            <h2>All Categories</h2>
            <input
              type="text"
              placeholder="Search for specific category :  "
              className="w-25"
              value={searchCategory}
              onChange={handleChange}
            />
          </div>
          <div className="row row-gap-2">
            {categories.map((category) => (
              <NavLink className="text-decoration-none col-2" to={`/ProductsWithCategory/${category._id}`} key={category._id}>
                <div
                  className="card"
                  style={{ width: "10rem", height: "18rem" }}
                >
                  <img
                    src={category.image.secure_url}
                    className="card-img-top p-2"
                    alt={category.name}
                  />
                  <h6 className="text-capitalize text-center ">{category.name}</h6>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
