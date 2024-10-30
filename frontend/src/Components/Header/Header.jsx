import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/userSlice";
import "./header.css";
import Cart from "../Cart/Cart";
import { useCart } from "../../../utils/context";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useCart();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/login");
  };
  const handleprofile= () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="header-container">
        <div className="hamburger">
          {clicked ? (
            <RxCross2 onClick={handleClick} />
          ) : (
            <FaBars onClick={handleClick} />
          )}
        </div>
        <div className="left">
          <h2>Sant Designer</h2>
        </div>
        <div className="middle">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/idols">Idols</Link>
            </li>
            <li>
              <Link to="/custom">Customised Shoes</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="#contactUs">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="right">
          <span onClick={handleprofile} className="user-name">{user ? user.name : "Guest"}</span>
          <span className="cart-icon">
            <BsCart2 onClick={() => setShowCart(true)} />
            {!!cart.length && <span>{cart.length}</span>}
          </span>
          {user && (
            <div onClick={handleLogout}>
              <CiLogout />
            </div>
          )}
        </div>
      </div>
      {clicked && (
        <div className="responsive-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/idols">Idols</Link>
            </li>
            <li>
              <Link to="/giftItems">Customised Designs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="#contactUs">Contact Us</a>
            </li>
          </ul>
        </div>
      )}
      {showCart && <Cart setShowCart={setShowCart} />}
    </>
  );
}

export default Header;
