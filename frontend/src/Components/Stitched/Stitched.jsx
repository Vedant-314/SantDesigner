import React, { useState, useEffect } from "react";
import { Card, Col, Row, Avatar, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import all from "../../assets/all.jpg";
import shirtImage from "../../assets/innerBS.jpg";
import premiumImage from "../../assets/innerDS.jpg";
import suitingImage from "../../assets/innerJS.jpg";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { useDispatch } from "react-redux";

import "./stitched.css";
const { Meta } = Card;
const { Text } = Typography;

const categories = [
  { name: "BASIC SUIT", imageUrl: shirtImage, category: "BasicSuits" },
  { name: "DESIGNER SUIT", imageUrl: premiumImage, category: "DesignSuits" },
  { name: "JODHPURI SUIT", imageUrl: suitingImage, category: "JodhSuits" },
];

const token = import.meta.env.VITE_TOKEN;

const urls = [
  "https://api.github.com/repos/Gurshaan-1/photos/contents/BS",
  "https://api.github.com/repos/Gurshaan-1/photos/contents/DS",
  "https://api.github.com/repos/Gurshaan-1/photos/contents/JS",
];

function Stitched() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { category } = useParams();

  useEffect(() => {
    if (category !== "all") {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(showLoading());
        const productResponse = await axios.get("/api/products/stitched");
        const productData = productResponse.data.filter(product => product.Category !== "sherwani");

        const imageResponse = await Promise.all(
          urls.map((url) =>
            axios.get(url, {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
              },
            })
          )
        );

        const imageData = imageResponse.flatMap((response) => response.data);

        dispatch(hideLoading());

        const uniqueProductData = Array.from(
          new Map(productData.map((product) => [product.SKU, product])).values()
        );

        const updatedProductData = uniqueProductData.map((product) => {
          const matchingImage = imageData.find((image) =>
            image.name.includes(product.SKU)
          );

          let imageUrl = "";
          if (matchingImage) {
            console.log(matchingImage);

            imageUrl = matchingImage.name.endsWith(".MP4")
              ? `https://raw.githubusercontent.com/Gurshaan-1/photos/main/${matchingImage.name.slice(
                  0,
                  2
                )}/${matchingImage.name}/${matchingImage.name}_2.JPG`
              : `https://raw.githubusercontent.com/Gurshaan-1/photos/main/${matchingImage.name.slice(
                  0,
                  2
                )}/${matchingImage.name}/${matchingImage.name}_1.JPG`;
          }

          return {
            ...product,
            imageUrl,
          };
        });

        setProducts(updatedProductData);
      } catch (error) {
        dispatch(hideLoading());
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.Category === selectedCategory)
    : products;

  const selectedCategoryDetails = categories.find(
    (cat) => cat.category === selectedCategory
  );

  return (
    <div className="stitch-container">
      <div
        className="category-banner"
        style={{
          backgroundImage: selectedCategoryDetails
            ? `url(${selectedCategoryDetails.imageUrl})`
            : `url(${all})`,
          color:"white",
        }}
      >
        <h2>
          {selectedCategoryDetails ? selectedCategoryDetails.name : "All Tailored Suits"}
        </h2>
      </div>

      <div className="arrival-container">

        <div className="arrival">
          <Row gutter={8}>
            {filteredProducts.map((product) => (
              <Col key={product._id} span={6} sm={12} xs={12} md={6}>
                <Card
                  hoverable
                  style={{
                    marginTop: 16,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 0,
                  }}
                  cover={
                    <img
                      alt={product.name}
                      src={product.imageUrl}
                      className="card-image"
                    />
                  }
                  onClick={() => navigate(`/stitchproduct/${product.SKU}`)}
                >
                  <Meta
                    className="meta"
                    title={product["product title"].toUpperCase()}
                    description={`INR ${product.price}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Stitched;
