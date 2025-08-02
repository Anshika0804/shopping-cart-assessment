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

## 📦 Setup Instructions

### Backend

1. Clone the repo:  
   git clone <your-repo-url>
   cd shopping-cart-backend
Install Go modules:

bash
go mod tidy
Create .env file with:

JWT_SECRET=your_super_secret_key
Run backend server:

bash
go run main.go
Frontend
Navigate to frontend folder (e.g., shopping-cart-frontend)

Install dependencies:

bash
npm install
Start React development server:

bash
npm start
Frontend runs on http://localhost:3000 by default and calls backend APIs on http://localhost:8080

🛠️ Frontend Routes & Pages
Path	Description
/items	View all available items
/add-item	Add new item form
/cart	View current user's cart
/checkout	Checkout page to place order
/orders	User's order history
/login	Login page
/register	User registration page

🔗 Frontend & Backend Integration Details
Authentication:
On login, JWT token is saved in localStorage. All protected requests (cart, orders, add to cart) send token in Authorization header:
Authorization: Bearer <JWT_TOKEN>

Add to Cart:
Adds item to user's cart via POST /carts. The item is then removed from the items list on frontend to reflect state.

Cart & Checkout:
Cart page fetches current cart from backend. Checkout posts to /orders to place order.

Add Item:
Item addition form posts to /items. On success, user is redirected back to /items.

📋 Sample API Usage (Backend)
Use curl or frontend app to interact:

Register user:

bash
curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{"username": "user1", "password": "pass"}'
Login:

bash
curl -X POST http://localhost:8080/users/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "pass"}'
List Items:

bash
curl http://localhost:8080/items
Add to Cart (with JWT token):

bash
curl -X POST http://localhost:8080/carts -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json" -d '{"item_id": 1}'
Get Cart:

bash
curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:8080/carts
Place Order:

bash
curl -X POST http://localhost:8080/orders -H "Authorization: Bearer <JWT_TOKEN>"
🗂️ Folder Structure
go
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
│   │   └── api.js  (axios instance)
│   ├── App.js
│   └── index.js
├── package.json
└── ...
License
MIT License
