import Slider from "../Slider/Slider";
import React from "react";
import NewArrival from "../NewArrival/NewArrival";
import Categories from "../Categories/Categories";

function Home() {
  return (
    <>
      <Slider />
      <Categories/>
      <NewArrival />
    </>
  );
}

export default Home;
