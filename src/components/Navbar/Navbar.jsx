import React, { useContext } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/User";

function Navbar() {
  const { userName, setUserToken, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/signin');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <NavLink className="navbar-brand text-uppercase fw-bold text-white" to="/"><span className="text-warning">M</span><span className="text-primary">o</span><span className="text-success">o</span><span className="text-danger">n</span></NavLink>
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
              {userName ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/cart">Cart</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/profile">Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/profile">Welcome <span className="fw-bold text-info">{userName}</span></NavLink>
                  </li>
                  <button className="btn text-white" onClick={logOut}>LogOut</button>
                </> :
                <>
                  <div className="d-flex text-white">
                    <NavLink className="btn me-2 text-white" to="/signup">SignUp</NavLink>
                    <NavLink className="btn text-white" to="/signin">SingIn</NavLink>
                  </div>
                </>}
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
