import React from "react";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper-bundle.min.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Style from "../components/Home.module.css";
function Home() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`);
      const data = await response.json();
      setCategories(data.categories);
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
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle">
        <div className="container">
          <div className="d-flex justify-content-start pb-3">
            <h2>View Categories</h2>
          </div>
          <div className="row column-gap-3 row-gap-3">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={7}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className={Style.down}
            >
              {categories.map((category) => (
                <SwiperSlide key={category._id}>
                  <div className="card col w-100 h-100">
                    <img
                      src={category.image.secure_url}
                      className="card-img-top p-2"
                      alt={category.name}
                    />
                    <h6 className="text-capitalize text-center">
                      {category.name}
                    </h6>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
