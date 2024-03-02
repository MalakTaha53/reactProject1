import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <NavLink className="navbar-brand text-white" to="/">Moon</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/cart">Cart</NavLink>
              </li>
            </ul>
            <div className="d-flex text-white">
              <NavLink className="btn me-2 text-white" to="/signup">SignUp</NavLink>
              <NavLink className="btn text-white" to="/signin">SingIn</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
