import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import "./cartitem.css";
import { useCart } from "../../../../utils/context";

const CartItem = () => {
  const { cart, removeItem, incrementQuantity, decrementQuantity } = useCart();
  return (
    <div className="cart-products">
      {cart?.map((item) => (
        <div key={item.id} className="cart-product">
          <div className="img-container">
            <img
              src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${item.id}/${item.id}_1.jpg`}
              alt=""
            />
          </div>
          <div className="prod-details">
            <span className="name">{item.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => removeItem(item.id)}
            />
            <div className="quantity-buttons">
              <span onClick={() => decrementQuantity(item.id)}>-</span>
              <span>{item.quantity}</span>
              <span onClick={() => incrementQuantity(item.id)}>+</span>
            </div>
            <div className="text">
              <span>{item.quantity}</span>
              <span>x</span>
              <span>{item.price} =</span>
              <span className="highlight">
                &#8377; {item.quantity * item.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
