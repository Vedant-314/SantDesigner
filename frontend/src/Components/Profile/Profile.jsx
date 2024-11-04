import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, ClockCircleOutlined } from "@ant-design/icons";

function Profile() {
  const [orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/orders/${user._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

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
              <span onClick={() => navigate(`/product/${item.id}`)}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>₹ {amount}</span>
          {console.log(record)}
          {record.isPaid !== "Pending" ? (
            <Tooltip title="Paid">
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginLeft: "8px" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Unpaid">
              <ClockCircleOutlined style={{ color: "#faad14", marginLeft: "8px" }} />
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const dataSource = orders.map((order, index) => ({
    key: order._id,
    serialNumber: index + 1,
    item: order.desc.items,
    status: order.prodStatus,
    amount: order.subtotal,
    isPaid: order.paymentStatus,
  }));

  const avatarLetter = user?.name.charAt(0).toUpperCase();

  return (
    <div className="profile-container">
      <div className="avatar">{avatarLetter}</div>
      <h2 className="full-name">{user?.name}</h2>
      <p className="phone-number">Phone: {user?.phone}</p>
      <p className="email">Email: {user?.email}</p>

      <div className="orders-title">My Orders</div>
      <Table
        className="orders-table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="_id"
      />
      {orders.length === 0 && (
        <div className="empty-state">No orders found.</div>
      )}
    </div>
  );
}

export default Profile;
