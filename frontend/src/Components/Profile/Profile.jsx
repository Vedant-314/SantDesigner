import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, ClockCircleOutlined } from "@ant-design/icons";

function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Fetch Orders Logic
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let response;
        if (user) {
          response = await axios.get(`/api/user/orders/${user._id}`);
        } else {
          const phoneNumber = localStorage.getItem("guestPhoneNumber");

          response = await axios.get(`/api/user/guest-orders/${phoneNumber}`);
        }
        setOrders(
          Array.isArray(response.data.orders) ? response.data.orders : []
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

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
          {items.map((item, index) => {
            const folderPrefix = getCategoryPrefix(item.category);
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
                className="render"
              >
                {folderPrefix && folderPrefix === "assets" ? (
                  <img
                    className="guest-profile-products"
                    src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.jpg`}
                    alt={item.title}
                  />
                ) : (
                  <img
                    className="guest-profile-products"
                    src={`https://raw.githubusercontent.com/Gurshaan-1/photos/main/${folderPrefix}/${item.id}/${item.id}_1.JPG`}
                    alt={item.title}
                  />
                )}
                <span onClick={() => navigate(`/product/${item.id}`)}>
                  {item.name}
                </span>
              </div>
            );
          })}
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
          {record.paymentMethod !== "COD" ? (
            <Tooltip title="Paid">
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ marginLeft: "8px" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Unpaid">
              <ClockCircleOutlined
                style={{ color: "#faad14", marginLeft: "8px" }}
              />
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
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
  }));

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || "G";

  return (
    <div className="profile-container">
      <div className="avatar">{avatarLetter}</div>
      <h2 className="full-name">{user?.name || "Guest"}</h2>
      <p className="phone-number">
        Phone:{" "}
        {user?.phone || localStorage.getItem("guestPhoneNumber") || "N/A"}
      </p>

      <div className="orders-title">My Orders</div>
      <Table
        className="orders-table"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="_id"
        loading={loading}
      />
      {orders.length === 0 && !loading && (
        <div className="empty-state">No orders found.</div>
      )}
    </div>
  );
}

export default Profile;
