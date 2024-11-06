import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../../../redux/userSlice";

import "./authpage.css";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../../../redux/alertSlice';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
    }
  };


  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/user/login",
        values
      );
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page!");
        localStorage.setItem("token", response.data.data);
        getUser();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button mt-3 my-2" htmlType="submit">
            LOGIN
          </Button>
          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
