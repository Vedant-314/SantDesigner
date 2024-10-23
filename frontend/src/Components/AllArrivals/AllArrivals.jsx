import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./AllArrivals.css";

const NewArrival = () => {
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();
  const { Meta } = Card;

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        
        const imageResponse = await fetch(
          "https://api.github.com/repos/Gurshaan-1/photos/contents/assets",
          
        );

        if (!imageResponse.ok) {
          throw new Error(
            "Failed to fetch images: " + imageResponse.statusText
          );
        }

        const imageData = await imageResponse.json();

        
        const productResponse = await fetch(
          "http://localhost:5002/api/products/get-products"
        );
        if (!productResponse.ok) {
          throw new Error(
            "Failed to fetch products: " + productResponse.statusText
          );
        }

        const productData = await productResponse.json();

        // Map product data with image URLs
        const updatedProductData = productData.map((product) => {
          // Match product image based on product name or SKU
          const matchingImage = imageData.find((image) =>
            image.name.includes(product.SKU)
          );

          return {
            ...product, // Keep product details (name, price, etc.)
            imageUrl: matchingImage
              ? `https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${matchingImage.name}/${matchingImage.name}_1.jpg`
              : "", // Fallback image if not found
          };
        });

        setProducts(updatedProductData); // Set products with images
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductImages();
  }, []);

  return (
    <div className="arrival-container">
      <h2>ALL PRODUCTS</h2>
      <div className="arrival">
        <Row gutter={16}>
          {products.map((product) => (
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
                  description={`₹ ${product["Selling Price"]}`} // Displaying price
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default NewArrival;
