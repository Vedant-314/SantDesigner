import React from "react";
import { useNavigate } from "react-router-dom";
import "./selected.css";

function Selected({ imgSrc, title, link, props }) {
  const navigate = useNavigate();
  return (
    <div
      className="selected-card"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      <button
        onClick={() => navigate(`/${link}${props ? `/${props}` : ''}`)}
        className="selected-button"
      >
        {title}
      </button>
    </div>
  );
}

export default Selected;
