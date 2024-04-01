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
  const getCategories = async () => {
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
  useEffect(() => {
    getCategories();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex justify-content-between pb-3">
            <h2>All Categories</h2>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {categories.map((category) => (
              <NavLink className="text-decoration-none " to={`/ProductsWithCategory/${category._id}`} key={category._id}>
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
