import React, { useEffect } from 'react'
import Category from '../Categories/Category/Category';
import "./selection.css";

import suitCover from "../../assets/suitCover.jpg";
import shoesCover from "../../assets/basicSuit.jpg";
import designerCover from "../../assets/designerCover.jpg";
import cat from "../../assets/JodhpuriSuit.jpg";
import Selected from './Selected/Selected';
 
const categories = [
  { title: "Designer Suits", image: suitCover, link: "stitched", props: "DesignSuits" },
  { title: "Basic Suits", image: shoesCover, link: "stitched", props: "BasicSuits" },
  { title: "Jodhpuri Suits", image: cat, link: "stitched", props: "JodhSuits" },
  { title: "All", image: designerCover, link: "stitched", props: "all" },
];

function Selection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="selection-container">
        <div className="selection">
        {categories.map((category, index) => (
                <Selected
                    key={index} 
                    imgSrc={category.image} 
                    link={category.link} 
                    title={category.title} 
                    props={category?.props}
                />
            ))}
        </div>
    </div>
  )
}

export default Selection