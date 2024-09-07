import { Card, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import src from "../../assets/back1.webp";
import "./NewArrival.css"
function NewArrival() {
  const navigate = useNavigate();
  const { Meta } = Card;

  const products = [
    {
      _id: "1",
      name: "Product 1",
      price: 1000,
      image: src,
    },
    {
      _id: "2",
      name: "Product 2",
      price: 1500,
      image: src,
    },
    {
      _id: "3",
      name: "Product 3",
      price: 2000,
      image: src,
    },
    {
      _id: "4",
      name: "Product 4",
      price: 2500,
      image: src,
    },
    {
      _id: "5",
      name: "Product 1",
      price: 1000,
      image: src,
    },
    {
      _id: "6",
      name: "Product 2",
      price: 1500,
      image: src,
    },
    {
      _id: "7",
      name: "Product 3",
      price: 2000,
      image: src,
    },
    {
      _id: "8",
      name: "Product 4",
      price: 2500,
      image: src,
    },
  ];

  return (
    <div className="arrival-container">
      <h2>NEW ARRIVALS</h2>
      <div className="arrival">
        <Row gutter={2}>
          {products.map((product) => (
            <Col key={product._id} span={4} sm={12} xs={24} md={6}>
              <Card
                hoverable
                style={{ marginTop: 16  , marginLeft: 16 , marginRight:16}}
                cover={<img alt={product.name} src={product.image} />}
              >
                <Meta className="meta"
                  title={product.name}
                  description={`Rs ${product.price}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default NewArrival;
