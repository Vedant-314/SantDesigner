import Slider from "../Slider/Slider";
import React from "react";
import NewArrival from "../NewArrival/NewArrival";
import { useNavigate } from "react-router-dom";
import Categories from "../Categories/Categories";
import imgSrc from "../../assets/CustomConcept.jpg";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Slider />
      <Categories />
      <div className="concept-title">
        <span>Custom Concept</span>
      </div>
      <div
        className="custom-concept-banner-container"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <button
          onClick={() => navigate(`/customconcept`)}
          className="custom-concept-button"
        >
          Share your idea
        </button>
      </div>
    </>
  );
}

export default Home;
