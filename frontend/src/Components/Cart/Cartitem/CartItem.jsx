import React from "react";
import { MdClose } from "react-icons/md";
import "./cartitem.css";
import { useCart } from "../../../../utils/context";

const CartItem = () => {
  const { cart, removeItem, incrementQuantity, decrementQuantity } = useCart();

  // Function to determine folder prefix based on category
  const getCategoryPrefix = (category) => {
    switch (category) {
      case "sherwani":
        return "IW";
      case "BasicSuits":
        return "BS";
      case "JodhSuits":
        return "JS";
      case "DesignSuits":
        return "DS";
      case "Shoes":
        return "HBS";
      default:
        return "assets"; // Fallback folder
    }
  };

  return (
    <div className="cart-products">
      {cart?.map((item) => {
        const folderPrefix = getCategoryPrefix(item.category); // Determine prefix
        return (
          <div key={item.id} className="cart-product">
            <div className="img-container">
              {folderPrefix && folderPrefix === "assets" ? (
                <img
                  src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.jpg`}
                  alt={item.title}
                />
              ) : (
                <img
                  src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.JPG`}
                  alt={item.title}
                />
              )}
              {console.log(
                `https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.JPG`
              )}
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
        );
      })}
    </div>
  );
};

export default CartItem;
