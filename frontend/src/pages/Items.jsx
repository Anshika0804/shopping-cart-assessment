import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addToCart = async (itemId) => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/carts",
        { item_id: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item added to cart");

      // ✅ Remove the added item from the list
      setItems((prevItems) => prevItems.filter((item) => item.ID !== itemId));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Items</h2>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/checkout")} style={buttonStyle}>
          Checkout
        </button>
        <button onClick={() => navigate("/cart")} style={buttonStyle}>
          Cart
        </button>
        <button onClick={() => navigate("/orders")} style={buttonStyle}>
          Order History
        </button>
        <button onClick={() => navigate("/add-item")} style={buttonStyle}>
          Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.ID}
              onClick={() => addToCart(item.ID)}
              style={itemStyle}
            >
              <strong>{item.Name}</strong> - {item.Description} (${item.Price})
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

const itemStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  cursor: "pointer",
};

export default Items;
