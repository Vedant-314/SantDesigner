import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export const CartContext = createContext();

const initialState = {
  cart: [],
  subtotal: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
        subtotal: calculateSubtotal(action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        subtotal: 0,
      };
    case "ADD_ITEM":
      return addItemToCart(state, action.payload);
    case "REMOVE_ITEM":
      return removeItemFromCart(state, action.payload);
    case "INCREMENT_QUANTITY":
      return updateItemQuantity(state, action.payload, "increment");
    case "DECREMENT_QUANTITY":
      return updateItemQuantity(state, action.payload, "decrement");
    default:
      return state;
  }
};

const calculateSubtotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const addItemToCart = (state, item) => {
  const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
  let newCart;

  if (existingItem) {
    newCart = state.cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    newCart = [...state.cart, { ...item, quantity: 1 }];
  }

  return {
    ...state,
    cart: newCart,
    subtotal: calculateSubtotal(newCart),
  };
};

const removeItemFromCart = (state, itemId) => {
  const newCart = state.cart.filter((item) => item.id !== itemId);
  return {
    ...state,
    cart: newCart,
    subtotal: calculateSubtotal(newCart),
  };
};

const updateItemQuantity = (state, itemId, type) => {
  const newCart = state.cart.map((item) => {
    if (item.id === itemId) {
      const newQuantity =
        type === "increment" ? item.quantity + 1 : item.quantity - 1;
      return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
    }
    return item;
  });
  return {
    ...state,
    cart: newCart,
    subtotal: calculateSubtotal(newCart),
  };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const reduxDispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const prevCartRef = useRef(state.cart);

  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (user) {
        try {
          const response = await axios.post(
            "/api/user/update-cart",
            {
              userId: user._id,
              cart: state.cart,
            }
          );
          reduxDispatch(setUser({ ...user, cart: response.data }));
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    };

    if (JSON.stringify(state.cart) !== JSON.stringify(prevCartRef.current)) {
      syncCartWithBackend();
      prevCartRef.current = state.cart;
    }
  }, [state.cart, user, reduxDispatch]);

  useEffect(() => {
    if (user && user.cart) {
      dispatch({ type: "SET_CART", payload: user.cart });
    }
  }, [user]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  const incrementQuantity = (itemId) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: itemId });
  };

  const decrementQuantity = (itemId) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: itemId });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        subtotal: state.subtotal,
        addItem,
        removeItem,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
