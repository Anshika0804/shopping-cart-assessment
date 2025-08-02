import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/users/login', form);
      const token = res.data.token;

      localStorage.setItem('token', token); // store token
      navigate('/items'); // go to items screen
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid username or password');
      } else {
        alert('Something went wrong during login');
        console.error(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Shopping Cart Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Login;
