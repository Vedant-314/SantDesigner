import { Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const { Option } = Select;

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(`/api/admin/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Orders",
      dataIndex: "item",
      key: "item",
      render: (items) => (
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
              className="render"
            >
              <img
                src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/assets/${item.id}/${item.id}_1.jpg`}
                alt={item.name}
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Customer Details",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div>
          <p>Customer Name - {customer.userName}</p>
          <p>Customer Phone Number - {customer.phoneNumber}</p>
          <b>Address</b>
          <p>{customer.address.addressLine1}</p>
          <p>{customer.address?.addressLine2}</p>
          <p>{customer.address.country.name}, {customer.address.state.name}, {customer.address.city.name}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue="Select Status"
          onChange={(value) => updateOrderStatus(record.key, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹ ${amount}`,
    },
  ];

  const dataSource = orders.map((order, index) => ({
    key: order._id,
    serialNumber: index + 1,
    item: order.desc.items,
    customer: {userName : order.userName, phoneNumber:order.desc.address.phoneNumber, address: order.desc.address},
    status: order.status,
    amount: order.subtotal,
  }));

  return (
    <div className="admin-container">
      <center>
        <h2>All Orders</h2>
      </center>
      <Table
        className="orders-table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loading}
        rowKey="_id"
      />
      {orders.length === 0 && !loading && (
        <div className="empty-state">No orders found.</div>
      )}
    </div>
  );
}

export default Admin;
