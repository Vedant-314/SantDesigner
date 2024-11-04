import React, { useEffect } from "react";
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
import CustomDesign from "./Components/CustomDesign/CustomDesign";
import Admin from "./Components/Admin/Admin";


function App() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

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
                <PublicRoute>
                  <Home />
                </PublicRoute>
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
                <PublicRoute>
                  <Product />
                </PublicRoute>
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
                <PublicRoute>
                  <AllArrivals />
                </PublicRoute>
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
            <Route
              path="/custom"
              element={
                <PublicRoute>
                  <CustomDesign />
                </PublicRoute>
              }
            />
            <Route
              path="/admin1234"
              element={
                <ProtectedRoute requiresAdmin={true}>
                  <Admin />
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
