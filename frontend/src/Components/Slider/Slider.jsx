import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import "./slider.css";

function Slider() {
  return (
    <div className="banner-container">
      <Carousel autoplay>
        <div className="slider-content1"></div>
        <div className="slider-content2"></div>
        <div className="slider-content3"></div>
        <div className="slider-content4"></div>
        <div className="slider-content5"></div>
        <div className="slider-content6"></div>
        <div className="slider-content7"></div>
      </Carousel>
    </div>
  );
}

export default Slider;
