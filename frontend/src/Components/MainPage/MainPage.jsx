import React, { useEffect, useState } from 'react';
import axios from "axios";

function MainPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5002/api/products/get-products");
    setProducts(res.data);
  };


  return (
    <div></div>
  )
}

export default MainPage