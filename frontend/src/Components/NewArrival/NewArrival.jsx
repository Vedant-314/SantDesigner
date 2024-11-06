import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewArrival.css";
import { hideLoading, showLoading } from '../../../redux/alertSlice';
import { useDispatch } from "react-redux";


const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Meta } = Card;
  const token = "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";

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        dispatch(showLoading());

        const productResponse = await axios.get(
          "/api/products/get-products"
          );
          const productData = productResponse.data;

          const imageResponse = await axios.get(
            "https://api.github.com/repos/Gurshaan-1/photos/contents/assets",
            {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json"
              }
            }
          );
          const imageData = imageResponse.data;

          dispatch(hideLoading());
          
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
        dispatch(hideLoading());
        console.error("Error fetching data:", error);
      }
    };

    fetchProductImages();
  }, []);

  return (
    <div className="arrival-container">
      <h2>NEW ARRIVALS</h2>
      <div className="arrival">
        <Row gutter={16}>
          {products.slice(0, 8).map((product) => (
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
        {products.length > 8 && (
          <div className="view-more-container">
            <Button onClick={() => navigate("/allarrivals")} className="product-btn">
              View More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
