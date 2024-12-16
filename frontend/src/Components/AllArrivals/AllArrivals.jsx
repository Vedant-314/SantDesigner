import React, { useState, useEffect } from "react";
import { Card, Col, Row, Avatar, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./allArrival.css";
import nehruJacketImage from "../../assets/nehruJacket.png";
import shirtImage from "../../assets/shirt.jpeg";
import premiumImage from "../../assets/premium.jpeg";
import suitingImage from "../../assets/suiting.jpeg";
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import { useDispatch } from "react-redux";
import Title from "../Title";


const { Meta } = Card;
const { Text } = Typography;

const categories = [
  { name: "Nehru Jacket Fabric", imageUrl: nehruJacketImage, category: "NehruJacket" },
  { name: "Shirt Fabric", imageUrl: shirtImage, category: "shirt" },
  { name: "Premium Fabric", imageUrl: premiumImage, category: "PremiumFabric" },
  { name: "Suiting Fabric", imageUrl: suitingImage, category: "suiting" },
];

const AllArrivals = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { category } = useParams();

  useEffect(() => {
    if (category!="all") {
      setSelectedCategory(category);
    }
    else{
      setSelectedCategory(null);
    }
  }, [category]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(showLoading());
        const productResponse = await axios.get("/api/products/items");
        const productData = productResponse.data;

        const imageResponse = await axios.get(
          "https://api.github.com/repos/Gurshaan-1/photos/contents/assets"
        );
        const imageData = imageResponse.data;

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
            imageUrl = matchingImage.name.endsWith(".MP4")
              ? `https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${matchingImage.name}/${matchingImage.name}_2.jpg`
              : `https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${matchingImage.name}/${matchingImage.name}_1.jpg`;
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

  return (
    <div className="arrival-container">
      <h2>ALL PRODUCTS</h2>

      <div className="category-avatars">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`avatar-item ${selectedCategory === category.category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.category)}
          >
            <Avatar size={64} src={category.imageUrl} />
            <Text className="category-name">{category.name}</Text>
          </div>
        ))}
      </div>

      <div className="arrival">
        <Row gutter={8}>
          {filteredProducts.map((product) => (
            <Col key={product._id} span={6} sm={12} xs={12} md={6}>
              <Card
                hoverable
                style={{ marginTop: 16, marginLeft: 5, marginRight: 5, borderRadius: 0, }}
                cover={<img alt={product.name} src={product.imageUrl} className="card-image" />}
                onClick={() => navigate(`/product/${product.SKU}`)}
              >
                <Meta
                  className="meta"
                  title={<Title  title={product["Product Name"].toUpperCase()} maxLength={30} />  }
                  description={`₹ ${product["Selling Price"]}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllArrivals;
