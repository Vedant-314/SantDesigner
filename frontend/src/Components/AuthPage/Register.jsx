import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import './authpage.css';

function Register() {
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const startOtpTimer = () => {
    setTimer(60); // 1 minute timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("/api/user/send-otp", { email });
      if (response.data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
        setOtpInputVisible(true);
        startOtpTimer();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("/api/user/verify-otp", { email, otp });
      if (response.data.success) {
        toast.success("OTP verified successfully");
        setIsVerified(true);
        setOtpInputVisible(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Invalid or expired OTP");
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page!");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item className="form-item" label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item className="form-item" label="Email" name="email">
            <div className="input-group">
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isVerified}
              />
              {!isVerified ? (
                <Button
                  onClick={handleSendOtp}
                  disabled={!email || otpSent}
                  style={{ marginLeft: "10px" }}
                >
                  {otpSent ? `Resend OTP (${timer}s)` : "Send OTP"}
                </Button>
              ) : (
                <CheckCircleOutlined className="icon-success" />
              )}
            </div>
          </Form.Item>
          {otpInputVisible && (
            <Form.Item className="form-item" label="Enter OTP">
              <div className="input-group">
                <Input
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button onClick={handleVerifyOtp} style={{ marginLeft: "10px" }}>
                  Verify
                </Button>
              </div>
            </Form.Item>
          )}
          <Form.Item className="form-item" label="Phone" name="phone">
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item className="form-item" label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button
            className="primary-button mt-3 my-2"
            htmlType="submit"
            disabled={!isVerified}
          >
            REGISTER
          </Button>
          <Link to="/login" className="anchor">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
