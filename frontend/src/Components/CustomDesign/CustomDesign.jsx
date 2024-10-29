import React from 'react';
import banner from "../../assets/handcrafted.png";
import './customdesign.css';

function CustomDesign() {
  return (
    <div className="custom-container">
      <div className="custom-banner">
        <img src={banner} alt="banner" />
      </div>
    </div>
  )
}

export default CustomDesign