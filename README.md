# 🛒 Shopping Cart Application

This is a simple **e-commerce application** with both backend and frontend parts:

- **Backend:** RESTful API built with Go, Gin, GORM, SQLite, JWT  
- **Frontend:** React SPA with React Router, Axios, and simple UI components  

---

## 🚀 Features

### Backend

- 🔐 User registration & login with JWT authentication  
- 📦 CRUD for Items  
- 🛒 Cart functionality (add items, view cart)  
- 📬 Orders (place order from cart, view order history)  
- Secure endpoints protected with JWT tokens  

### Frontend

- 🛍️ Browse available items  
- ➕ Add new items (with redirect on success)  
- 🛒 Add items to cart (removes from item list and shows in cart)  
- 📋 View cart contents  
- ✅ Checkout cart and place order  
- 📜 View order history  
- 🔑 Login & token stored in localStorage for authenticated requests  
- React Router for SPA navigation  

---

## 🗃️ Technologies

- **Backend:** Go 1.24+, Gin, GORM, SQLite, JWT  
- **Frontend:** React 18+, React Router v6, Axios  

---

## ⚙️ Setup Instructions

### 📦 Backend

1. **Clone the repo**:
   ```bash
   git clone <repo-url>
   cd shopping-cart-backend
   ```

2. **Install Go modules**:
   ```bash
   go mod tidy
   ```

3. **Create a `.env` file** with:
   ```env
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the backend server**:
   ```bash
   go run main.go
   ```

---

### 🌐 Frontend

1. **Navigate to frontend folder**:
   ```bash
   cd shopping-cart-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start React development server**:
   ```bash
   npm start
   ```

- Frontend runs on: [http://localhost:3001](http://localhost:3000)  
- Backend APIs run on: [http://localhost:8080](http://localhost:8080)

---

## 🛠️ Frontend Routes & Pages

| Path         | Description                    |
|--------------|--------------------------------|
| `/items`     | View all available items       |
| `/add-item`  | Add new item form              |
| `/cart`      | View current user's cart       |
| `/checkout`  | Checkout page to place order   |
| `/orders`    | User's order history           |
| `/login`     | Login page                     |
| `/register`  | User registration page         |

---

## 🔗 Frontend & Backend Integration

### 🔐 Authentication
- On login, **JWT token** is saved in `localStorage`.
- All protected requests include:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```

### 🛒 Add to Cart
- Adds item to user's cart using:
  ```http
  POST /carts
  ```
- On success, item is removed from the item list on the frontend.

### 🛍️ Cart & Checkout
- Cart fetches from:
  ```http
  GET /carts
  ```
- Checkout posts to:
  ```http
  POST /orders
  ```

### ➕ Add Item
- Posts to `/items`.
- On success, redirects back to `/items`.

---

## 📋 Sample API Usage

### 🔐 Register user
```bash
curl -X POST http://localhost:8080/users \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "pass"}'
```

### 🔑 Login
```bash
curl -X POST http://localhost:8080/users/login \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "pass"}'
```

### 📦 List Items
```bash
curl http://localhost:8080/items
```

### ➕ Add to Cart (JWT required)
```bash
curl -X POST http://localhost:8080/carts \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"item_id": 1}'
```

### 🛒 Get Cart
```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
http://localhost:8080/carts
```

### 🧾 Place Order
```bash
curl -X POST http://localhost:8080/orders \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 🗂️ Folder Structure

```
shopping-cart-backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── go.mod
├── go.sum
└── main.go

shopping-cart-frontend/
├── src/
│   ├── pages/
│   │   ├── AddItem.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Items.jsx
│   │   ├── Login.jsx
│   │   ├── OrderHistory.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── package.json
└── ...
```

---

## 📄 License

MIT License. Use freely with attribution.
