import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";

function ProtectedRoute({ children, requiresAdmin = false }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/login");
      }
    } catch (error) {
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    if (requiresAdmin && user && !user.isAdmin) {
      toast.error("You must be an admin");
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
