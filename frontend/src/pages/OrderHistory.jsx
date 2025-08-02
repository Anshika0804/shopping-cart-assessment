import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Order History</h2>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/")} style={buttonStyle}>
          Items
        </button>
        <button onClick={() => navigate("/cart")} style={buttonStyle}>
          Cart
        </button>
        <button onClick={() => navigate("/checkout")} style={buttonStyle}>
          Checkout
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No past orders found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li key={order.ID} style={orderStyle}>
              <p style={{ fontWeight: "bold", marginBottom: 8 }}>
                Order #{order.ID}
              </p>
              <ul style={{ listStyle: "none", paddingLeft: 20 }}>
                {order.Items.map((item) => (
                  <li key={item.ID} style={itemStyle}>
                    <strong>{item.Name}</strong> - {item.Description} (${item.Price})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const buttonStyle = {
  marginRight: 10,
  padding: "10px 15px",
  cursor: "pointer",
};

const orderStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "15px",
};

const itemStyle = {
  marginBottom: "8px",
};

export default OrderHistory;
