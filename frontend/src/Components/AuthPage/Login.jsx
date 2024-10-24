import React from 'react'
import {Button, Form, Input} from 'antd'
import {Link, useNavigate} from'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios"

import "./authpage.css"

function Login() {

const navigate = useNavigate();

const onFinish = async(values) =>{
  try{
    const response = await axios.post('http://localhost:5002/api/user/login', values);
    if(response.data.success){
      toast.success(response.data.message);
      toast("Redirecting to Home page!");
      localStorage.setItem("token", response.data.data);
      navigate("/");
    }
    else{
      toast.error(response.data.message);
    }
  } catch(error){
    toast.error("Something went wrong!");
  }
}

  return (
    <div className='authentication'>
      <div className='authentication-form'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Email' name='email'>
                <Input placeholder='Email' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input placeholder='Password' type='password' />
            </Form.Item>
            <Button className='primary-button mt-3 my-2' htmlType='submit'>LOGIN</Button>
            <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login