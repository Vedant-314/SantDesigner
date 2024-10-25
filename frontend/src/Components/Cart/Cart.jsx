import React from "react";
import { BsCartX } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CartItem from "./Cartitem/Cartitem";
import { useCart } from "../../../utils/context";
import "./cart.css";

function Cart({ setShowCart }) {
  const { cart, subtotal } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        {!cart.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta">RETURN TO SHOP</button>
          </div>
        )}

        {!!cart?.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">SubTotal: </span>
                <span className="text total">&#8377; {subtotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
