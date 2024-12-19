import React from "react";
import Category from "./Category/Category";
import "./categories.css";
import suitCover from "../../assets/suitCover.jpg";
import shoesCover from "../../assets/shoesCover.jpg";
import designerCover from "../../assets/designerCover.jpg";
import cat from "../../assets/cat.jpg";



const categories = [
    { title: "Tailored Suits", image: designerCover, link: "selection" },
    { title: "Handmade Shoes", image: shoesCover, link: "custom" },
    { title: "Fabrics for Him", image: suitCover, link: "allarrivals", props: "suiting" },
    { title: "Sherwani", image: cat, link: "sherwani" },
];

function Categories() {
    
  return (
    <div className="categories-container">
        <div className="categories-title">
            <h2>SOMETHING SPECIAL FOR YOU</h2>
        </div>
        <div className="categories-map">
        {categories.map((category, index) => (
                <Category
                    key={index} 
                    imgSrc={category.image} 
                    link={category.link} 
                    title={category.title} 
                    props={category?.props}
                />
            ))}
        </div>
    </div>
  );
}

export default Categories;
