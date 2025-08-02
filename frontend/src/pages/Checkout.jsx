import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:8080/carts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    fetchCart();
  }, []);

  const handleOrder = async () => {
    try {
      await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Order placed successfully");
      navigate("/order-history");
    } catch (err) {
      alert("Failed to place order");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Checkout</h2>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navigate("/")} style={buttonStyle}>
          Items
        </button>
        <button onClick={() => navigate("/cart")} style={buttonStyle}>
          Cart
        </button>
        <button onClick={() => navigate("/order-history")} style={buttonStyle}>
          Orders
        </button>
      </div>

      {cart?.Items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart?.Items?.map((item) => (
            <li key={item.ID} style={itemStyle}>
              <p>
                <strong>{item.Name}</strong> - {item.Description} (${item.Price})
              </p>
            </li>
          ))}
        </ul>
      )}

      {cart?.Items?.length > 0 && (
        <button onClick={handleOrder} style={orderButtonStyle}>
          Place Order
        </button>
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
};

const orderButtonStyle = {
  marginTop: 20,
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Checkout;
