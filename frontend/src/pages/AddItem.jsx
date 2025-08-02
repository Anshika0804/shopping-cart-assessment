import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      item.name.trim() === "" ||
      item.description.trim() === "" ||
      parseFloat(item.price) <= 0 ||
      parseInt(item.quantity) < 0
    ) {
      setMessage("❌ Please enter valid values.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/items", {
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
      });

      if (res.status === 200) {
        setMessage("✅ Item added successfully!");
        setIsSuccess(true);
        setItem({ name: "", description: "", price: "", quantity: "" });

        setTimeout(() => {
          navigate("/items");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add item.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Item</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          required
          style={styles.input}
          min="0.01"
          step="0.01"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={item.quantity}
          onChange={handleChange}
          required
          style={styles.input}
          min="0"
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {message && (
        <p style={{ color: isSuccess ? "green" : "red", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #aaa",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #aaa",
    height: "90px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddItem;
