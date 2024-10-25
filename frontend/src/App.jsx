import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../utils/context";

import About from "./Components/About/About";
import Login from "./Components/AuthPage/Login";
import Register from "./Components/AuthPage/Register";
import Billing from "./Components/Billing/Billing";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import AllArrivals from "./Components/AllArrivals/AllArrivals";
import Profile from "./Components/Profile/Profile";

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;


function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <Header />
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allarrivals"
              element={
                <ProtectedRoute>
                  <AllArrivals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
