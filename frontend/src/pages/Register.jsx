import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import this

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/users", {
        username,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage(`User '${res.data.username}' registered successfully!`);

        // Redirect to login page after short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500); // 1.5 seconds delay to show success message
      } else {
        setMessage("Unexpected response status: " + res.status);
      }
    } catch (err) {
      setMessage("Failed to register user.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
