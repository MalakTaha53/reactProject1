import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Home.css";
function Home() {
  const [categories, setCategories] = useState([]);
  const getProducts = async () => {
    const response = await fetch(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=9`);
    const data = await response.json();
    setCategories(data.categories);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="pt-2 pb-2 bg-secondary-subtle">
        <div className="container">
          <div className="row column-gap-3 row-gap-3">
            {categories.map(category =>
              <div className="card" style={{ width: '10rem' }}>
                <img src={category.image.secure_url} className="card-img-top p-2" alt={category.name} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home