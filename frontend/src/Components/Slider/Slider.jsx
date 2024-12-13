import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import "./slider.css";

function Slider() {
  return (
    <div className="banner-container">
      <Carousel autoplay>
        <div className="slider-content1">
          {/* <div className="slider-text">
            <p>
            Discover the Luxury of Fine Fabrics - Where Style Meets Comfort
            </p>
            <Link to='/allarrivals'>
              <h2>SHOP NOW</h2>
            </Link>
          </div> */}
        </div>
        <div className="slider-content2">
          {/* <div className="slider-text">
            <p>
            Step into Artisan Elegance - Handcrafted Shoes with Heart
            </p>
            <Link to='/custom'>
              <h2>SHOP NOW</h2>
            </Link>
          </div> */}
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
