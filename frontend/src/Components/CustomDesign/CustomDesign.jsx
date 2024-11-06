import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import banner from "../../assets/handcrafted.png";
import './customdesign.css';
import axios from "axios";
import { hideLoading, showLoading } from '../../../redux/alertSlice';


const { Meta } = Card;


function CustomDesign() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = "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";


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(showLoading());
        const productResponse = await axios.get("/api/products/shoes");
        const productData = productResponse.data;

        const imageResponse = await axios.get(
          "https://api.github.com/repos/Gurshaan-1/photos/contents/HBS",
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json"
            }
          }
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
            imageUrl = matchingImage.name.endsWith(".JPG")
              ? `https://raw.githubusercontent.com/Gurshaan-1/photos/main/HBS/${matchingImage.name}/${matchingImage.name}_1.JPG`
              : `https://raw.githubusercontent.com/Gurshaan-1/photos/main/HBS/${matchingImage.name}/${matchingImage.name}_1.JPG`;
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

  return (
    <div className="custom-container">
      <div className="custom-banner">
        <img src={banner} alt="banner" />
      </div>
      <div className="arrival">
        <Row gutter={16}>
          {products.map((product) => (
            <Col key={product._id} span={6} sm={12} xs={24} md={6}>
              <Card
                hoverable
                style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
                cover={<img alt={product.name} src={product.imageUrl} />}
                onClick={() => navigate(`/shoeproduct/${product.SKU}`)}
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
  )
}

export default CustomDesign