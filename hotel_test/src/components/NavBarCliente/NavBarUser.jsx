import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import navlogo from "../../assets/superlogo.jpeg";
import { LOGIN } from "../../redux/actions/actionTypes";
import "./NavBarUser.styles.css";

const NavBarUser = () => {
  const { activeUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(activeUser);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src={navlogo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <a href="/Supps" className="nav-link">
          Supps
        </a>
        <a href="/shop" className="nav-link">
          Shop
        </a>
        {activeUser.isAdmin == true && (
          <a href="/dashboard" className="nav-link">
            {" "}
            DASHBOARD{" "}
          </a>
        )}
      </div>

      <div className="navbar-actions">
        <button className="test-admin-btn"
          onClick={() =>
            dispatch({ type: LOGIN, payload: { name: "TEST", isAdmin: true } })
          }
        >
          Test Admin
        </button>

        {!activeUser.name && (
          <Link to="/login" className="sign-in-btn">
            Sign In
          </Link>
        )}


        <div className="cart-icon">
          <Link to="/cart">
            <img src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg" />
          </Link>
          {JSON.parse(window.localStorage.getItem("activeUser")) != false && (
            <button
              onClick={() => {
                window.localStorage.setItem(
                  "activeUser",
                  JSON.stringify(false)
                );
                location.reload();
              }}
            >
              {" "}
              LogOut{" "}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarUser;
