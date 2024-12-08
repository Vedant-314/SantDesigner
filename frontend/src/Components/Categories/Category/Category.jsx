import React from "react";
import { useNavigate } from "react-router-dom";
import cat from "../../../assets/category.jpg";
import "./category.css";

function Category({ imgSrc, title, link, props }) {
  const navigate = useNavigate();
  return (
    <div
      className="category-card"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      <button
        onClick={() => navigate(`/${link}${props ? `/${props}` : ''}`)}
        className="category-button"
      >
        {title}
      </button>
    </div>
  );
}

export default Category;
