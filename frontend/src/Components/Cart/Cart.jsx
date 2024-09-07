import React, { useContext } from 'react'
import { BsCartX } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
// import { Context } from "../../../utils/context";
// import CartItem from './CartItem';

import "./cart.css";


function Cart({setShowCart}) {
    // const {cartItems, cartSubTotal} = useContext(Context)
    // console.log(cartItems);
    const navigate = useNavigate();
    const handleCheckout=()=>{
        navigate('/checkout')
    }

    let cartItems = 2;
  return (
    <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-btn" onClick={()=> setShowCart(false)}>
                        <MdClose />
                        <span className="text">close</span>
                    </span>
                </div>

                {!cartItems.length && <div className="empty-cart">
                    <BsCartX/>
                    <span>No products in the cart.</span>
                    <button className="return-cta">RETURN TO SHOP</button>
                </div>}

                {!!cartItems.length && <>
                    {/* <CartItem/> */}
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">SubTotal:</span>
                            <span className="text total">&#8377;1</span>

                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={e=>handleCheckout()}>Checkout</button>
                        </div>
                    </div>
                </>}

            </div>
        </div>
  )
}

export default Cart