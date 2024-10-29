import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/admin/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Optionally, make an API call to update the order status on the server
      await axios.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
      // Update the local state
      setOrders((prevOrders) =>
        prevOrders.map(
          (order) =>
            order._id === orderId ? { ...order, state: newStatus } : order // Change 'status' to 'state'
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-list-container">
      <center>
        <h1>All Orders</h1>
      </center>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Username</th>
            <th>Description</th>
            <th>Subtotal</th>
            <th>Order State</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.razorpayorderid}</td>
              <td>{order.paymentId}</td>
              <td>{order.userId?.name || "N/A"}</td>
              <td>
                <ul className="desc-list">
                  {order.desc &&
                    Object.entries(order.desc).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong>{" "}
                        {typeof value === "object" ? (
                          <pre>{JSON.stringify(value, null, 2)}</pre>
                        ) : (
                          value
                        )}
                      </li>
                    ))}
                </ul>
              </td>
              <td>{order.subtotal}</td>
              <td>
                <select
                  value={order.state || "pending"} // Default to "pending" if no state is set
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="order-status-dropdown"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
