import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import "./billing.css";
import { useCart } from "../../../utils/context";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Billing() {
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const userName = user?.name;

  const [isCOD, setIsCOD] = useState(false);

  const handlePayment = async (values) => {
    const address = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      country: values.country.name,
      state: values.state.name,
      city: values.city,
      pincode: values.pincode,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
    };

    const isLoggedIn = !!userId;

    if (isCOD) {
      try {
        const payload = {
          cart,
          address,
          subtotal,
          paymentMethod: "COD",
        };

        if (isLoggedIn) {
          // Logged-in user payload
          payload.userId = userId;
          payload.userName = userName;

          await axios.post("/api/user/create-cod-order", payload);
        } else {
          // Guest user payload
          payload.firstName = `${address.firstName} ${address.lastName}`;
          payload.phoneNumber = address.phoneNumber;

          await axios.post("/api/user/create-guest-cod-order", payload);
        }

        clearCart();
        navigate("/profile");
        toast.success("Order placed successfully. Pay upon delivery.");
      } catch (error) {
        console.error("COD Order error:", error);
        toast.error("Failed to place COD order.");
      }
    } else {
      try {
        const order = isLoggedIn
          ? await axios.post("/api/user/create-order", { subtotal })
          : await axios.post("/api/user/create-guest-order", { subtotal });

        const options = {
          key: "rzp_test_zK3u7sfYV5RQYI",
          amount: order.data.amount,
          currency: "INR",
          order_id: order.data.id,
          handler: async function (response) {
            try {
              const payload = {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                cart,
                address,
                subtotal,
                paymentMethod: "Online",
              };

              if (isLoggedIn) {
                // Add logged-in user-specific details
                payload.userId = userId;
                payload.userName = userName;

                await axios.post("/api/user/verify-payment", payload);
              } else {
                payload.userName = `${address.firstName} ${address.lastName}`;
                payload.phoneNumber = address.phoneNumber;

                await axios.post("/api/user/verify-guest-payment", payload);
              }

              clearCart();
              navigate("/profile");
              toast.success("Payment successful and order placed!");
            } catch (error) {
              console.error("Payment verification error:", error.message);
              toast.error("Payment verification failed. Please try again.");
            }
          },

          prefill: {
            name: address.firstName + " " + address.lastName,
            email: "customer@example.com",
            contact: address.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment error:", error);
        alert("Failed to process payment.");
      }
    }
  };

  const getCategoryPrefix = (category) => {
    switch (category) {
      case "sherwani":
        return "IW";
      case "BasicSuits":
        return "BS";
      case "JodhSuits":
        return "JS";
      case "DesignSuits":
        return "DS";
      case "Shoes":
        return "HBS";
      default:
        return "assets"; // Fallback folder
    }
  };

  return (
    <>
      <div className="billing-container">
        <div className="billing-left">
          <Form layout="vertical" onFinish={handlePayment}>
            <Row gutter={16}>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please input the country!" },
                  ]}
                >
                  <CountrySelect
                    onChange={(e) => {
                      setCountryId(e.id);
                    }}
                    placeHolder="Select Country"
                    showFlag={true}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item label="State" name="state">
                  <StateSelect
                    countryid={countryId}
                    onChange={(e) => {
                      setStateId(e.id);
                    }}
                    placeHolder="Select State"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item label="City" name="city">
                  <CitySelect
                    countryid={countryId}
                    stateid={stateId}
                    onChange={(e) => {
                      console.log(e);
                    }}
                    placeHolder="Select City"
                  />
                </Form.Item>
              </Col>
              <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                  label="Pincode"
                  name="pincode"
                  rules={[
                    { required: true, message: "Please input your pincode!" },
                  ]}
                >
                  <Input placeholder="Pincode" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label="Address Line 1"
                  name="addressLine1"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input placeholder="Address Line 1" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Address Line 2" name="addressLine2">
                  <Input placeholder="Address Line 2" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => setIsCOD(false)}
                  >
                    Pay Online
                  </Button>
                  <Button
                    type="default"
                    htmlType="submit"
                    onClick={() => setIsCOD(true)}
                    disabled={subtotal >= 2000}
                    style={{ marginLeft: "10px" }}
                  >
                    Pay on Delivery (+₹120)
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="billing-right">
          <h2>Cart - Items</h2>
          <div className="cart-items">
            <div className="cart-products">
              {cart?.map((item) => {
                const folderPrefix = getCategoryPrefix(item.category);
                return (
                  <div key={item.id} className="cart-product">
                    <div className="img-container">
                      {folderPrefix && folderPrefix === "assets" ? (
                        <img
                          src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.jpg`}
                          alt={item.title}
                        />
                      ) : (
                        <img
                          src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.JPG`}
                          alt={item.title}
                        />
                      )}
                    </div>
                    <div className="prod-details">
                      <span className="name">{item.title}</span>

                      <div className="cart-buttons">
                        <p>Quantity:</p>
                        <span>{item.quantity}</span>
                      </div>

                      <div className="text">
                        {item?.color ? (
                          <span>
                            <b>Color: </b>
                            {item.color}
                          </span>
                        ) : (
                          ""
                        )}
                        {item?.size ? (
                          <span>
                            <b>Size: </b>
                            {item.size}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="text">
                        <span>{item.quantity}</span>
                        <span>x</span>
                        <span>{item.price} =</span>
                        <span className="highlight">
                          &#8377; {item.quantity * item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="cart-total">
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">SubTotal:</span>
                <span className="text total">
                  &#8377; {isCOD ? subtotal + 120 : subtotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;
