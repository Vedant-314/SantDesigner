import React, { useState, useEffect } from "react";
import { Card, Col, Row, Avatar, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./allArrival.css";
import nehruJacketImage from "../../assets/nehruJacket.png"
import shirtImage from "../../assets/shirt.jpeg"
import premiumImage from "../../assets/premium.jpeg";

const { Meta } = Card;
const { Text } = Typography;

const categories = [
  { name: "Nehru Jacket", imageUrl: nehruJacketImage, category: 'NehruJacket' },
  { name: "Shirt", imageUrl: shirtImage, category: 'shirt' },
  { name: "Premium Fabric", imageUrl: premiumImage, category: 'PremiumFabric' },
];

const AllArrivals = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const imageResponse = await axios.get(
          "https://api.github.com/repos/Gurshaan-1/photos/contents/assets"
        );
        const imageData = imageResponse.data;

        const productResponse = await axios.get("/api/products/items");
        const productData = productResponse.data;

        const updatedProductData = productData.map((product) => {
          const matchingImage = imageData.find((image) =>
            image.name.includes(product.SKU)
          );

          return {
            ...product,
            imageUrl: matchingImage
              ? `https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${matchingImage.name}/${matchingImage.name}_1.jpg`
              : "",
          };
        });

        setProducts(updatedProductData);
      } catch (error) {
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
        <Row gutter={16}>
          {filteredProducts.map((product) => (
            <Col key={product._id} span={6} sm={12} xs={24} md={6}>
              <Card
                hoverable
                style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
                cover={<img alt={product.name} src={product.imageUrl} />}
                onClick={() => navigate(`/product/${product.SKU}`)}
              >
                <Meta
                  className="meta"
                  title={product.name}
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
