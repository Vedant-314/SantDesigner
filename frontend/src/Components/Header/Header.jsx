import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/userSlice";
import "./header.css";
import Cart from "../Cart/Cart";
import { useCart } from "../../../utils/context";
import toast from "react-hot-toast";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleClick = () => setClicked(!clicked);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged Out Successfully!");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleProfile = (userName) => {
    if (userName) {
      navigate("/profile");
    } else {
      setPhoneModalOpen(true); // Open phone number modal for guests
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber) {
      setPhoneModalOpen(false); // Close modal
      localStorage.setItem("guestPhoneNumber", phoneNumber);
      navigate("/profile"); // Navigate to profile page
    } else {
      toast.error("Please enter a valid phone number!");
    }
  };

  return (
    <>
      <div className="header-container">
        
        <div className="left">
          <h2>Sant Designer</h2>
        </div>
        <div className="middle">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/custom">Customised Shoes</Link>
            </li>
            <li>
              <a href="#contactUs">About Us</a>
            </li>
            <li>
              {user?.isAdmin ? (
                <Link to="/admin1234">Admin</Link>
              ) : (
                <a href="#contactUs">Contact Us</a>
              )}
            </li>
          </ul>
        </div>
        <div className="right">
          <span onClick={() => handleProfile(user?.name)} className="user-name">
            {user ? user.name : "Guest"}
          </span>
          <span className="cart-icon">
            <BsCart2 onClick={() => setShowCart(true)} />
            {!!cart.length && <span>{cart.length}</span>}
          </span>

          {!user && (
            <div className="login-box" onClick={() => navigate('/login')}>
              <CiLogin /> <span className="user-name">Login</span>
            </div>
          )}

          {user && (
            <div onClick={handleLogout}>
              <CiLogout />
            </div>
          )}
        <div className="hamburger">
          {clicked ? (
            <RxCross2 onClick={handleClick} />
          ) : (
            <FaBars onClick={handleClick} />
          )}
        </div>
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
      {phoneModalOpen && (
        <div
          className="phone-modal-overlay"
          onClick={() => setPhoneModalOpen(false)}
        >
          <div
            className="phone-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Track Your Orders</h2>
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="phone-modal-buttons">
              <button onClick={handlePhoneSubmit}>Submit</button>
              <button onClick={() => setPhoneModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
