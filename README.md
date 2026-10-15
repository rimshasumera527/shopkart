<div align="center">

# 🛍️ ShopKart

**A full-stack e-commerce web application built with React, Node.js, Express, MongoDB & Razorpay.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth** | Register, Login & Logout with JWT stored in httpOnly cookies |
| 🏠 **Home** | Personalized welcome with user profile card |
| 🛒 **Products** | Browse catalogue with live search, category filter & price sort |
| 📦 **Product Details** | Full product page with stock status |
| ❤️ **Wishlist** | Save and manage favourite products |
| 🛍️ **Cart** | Add items, adjust quantities, remove items |
| 💳 **Checkout** | Razorpay payment gateway (test mode) with address form |
| ✅ **Order Success** | Confirmation page with order summary |
| 📋 **My Orders** | Order history with status tracking |
| 🔍 **Order Details** | Detailed view of each order with shipping info |

---

## 🖥️ Tech Stack

### Backend
- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Auth:** JWT + httpOnly cookies + bcrypt
- **Payments:** Razorpay (HMAC signature verification)
- **Structure:** MVC (Models → Controllers → Routes)

### Frontend
- **Library:** React 19
- **Routing:** React Router 7
- **HTTP:** Axios (with credentials)
- **Bundler:** Vite 8
- **Styling:** Pure CSS with CSS custom properties (design tokens)
- **Font:** Inter (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas cluster **or** a local MongoDB instance
- A [Razorpay account](https://dashboard.razorpay.com) (free test keys)

---

### 1. Clone the repository

```bash
git clone https://github.com/rimshasumera527/shopkart.git
cd shopkart
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=your_strong_random_secret
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Optional — if Atlas DNS resolution fails on your network:
# MONGO_DNS_SERVERS=1.1.1.1,8.8.8.8
```

> **MongoDB Atlas setup:** Go to Atlas → Network Access → Add IP Address → Allow from anywhere (for dev) or your specific IP.

Seed the database with 10 sample products:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev        # runs on http://localhost:8080
```

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev        # opens on http://localhost:5173
```

> The Vite dev server proxies `/api/*` → `http://localhost:8080` automatically — no extra config needed.

---

## 📁 Project Structure

```
shopkart/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── customerController.js  # Auth logic (register, login, me, logout)
│   │   ├── productController.js   # CRUD + search/filter
│   │   ├── wishlistController.js  # Toggle + list wishlist
│   │   ├── cartController.js      # Cart operations
│   │   └── orderController.js     # Order creation + Razorpay integration
│   ├── middlewares/
│   │   └── isAuthenticated.js     # JWT cookie guard
│   ├── models/
│   │   ├── Customer.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── customerRoutes.js
│   │   ├── productRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedProducts.js
│   ├── .env.example               # ← copy to .env
│   └── index.js                   # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── CartItem.jsx
    │   │   ├── WishlistCard.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── PublicRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx     # User session
    │   │   └── CartContext.jsx     # Global cart state
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Wishlist.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── OrderSuccess.jsx
    │   │   ├── Orders.jsx
    │   │   └── OrderDetails.jsx
    │   ├── services/
    │   │   └── api.js             # Axios instance + all API calls
    │   ├── App.jsx                # Route definitions
    │   ├── main.jsx               # React root
    │   └── style.css              # Global design system (CSS variables)
    ├── index.html
    └── vite.config.js             # Proxy /api → backend
```

---

## 🌐 API Reference

**Base URL:** `http://localhost:8080`  
*(Vite proxies `/api/*` in development — frontend calls `/api/customers/login` etc.)*

### 🔐 Auth — `/customers`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/customers/register` | — | Create a new account |
| `POST` | `/customers/login` | — | Login (sets JWT cookie) |
| `GET` | `/customers/me` | ✅ | Get current user profile |
| `POST` | `/customers/logout` | ✅ | Clear auth cookie |

### 📦 Products — `/products`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | ✅ | List all products (supports filters) |
| `GET` | `/products/:id` | ✅ | Get a single product |
| `POST` | `/products` | — | Create a product (for seeding) |

**Query params for `GET /products`:**

| Param | Example | Effect |
|---|---|---|
| `search` | `?search=keyboard` | Case-insensitive name match |
| `category` | `?category=Electronics` | Exact category filter |
| `sort` | `?sort=price_asc` | `price_asc` or `price_desc` |

### ❤️ Wishlist — `/wishlist`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/wishlist` | ✅ | Get user's wishlist |
| `POST` | `/wishlist/toggle/:productId` | ✅ | Add or remove from wishlist |
| `DELETE` | `/wishlist/:productId` | ✅ | Remove a specific product |

### 🛒 Cart — `/cart`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/cart` | ✅ | Get current cart |
| `POST` | `/cart/add` | ✅ | Add item to cart |
| `PUT` | `/cart/update` | ✅ | Update item quantity |
| `DELETE` | `/cart/remove/:productId` | ✅ | Remove item from cart |
| `DELETE` | `/cart/clear` | ✅ | Clear entire cart |

### 📋 Orders — `/orders`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/orders` | ✅ | Get all user orders |
| `GET` | `/orders/:id` | ✅ | Get a specific order |
| `POST` | `/orders/create-payment-order` | ✅ | Create Razorpay order + pending ShopKart order |
| `POST` | `/orders/verify-payment` | ✅ | Verify HMAC signature & mark order PAID |
| `PATCH` | `/orders/:id/status` | ✅ | Advance order status |

---

## 🔄 Frontend Routes

| Route | Page | Guard |
|---|---|---|
| `/` | → redirect to `/login` | — |
| `/login` | Login | Public only |
| `/register` | Register | Public only |
| `/home` | Dashboard / Profile | 🔐 Auth required |
| `/products` | Product listing | 🔐 Auth required |
| `/products/:id` | Product details | 🔐 Auth required |
| `/wishlist` | Saved products | 🔐 Auth required |
| `/cart` | Shopping cart | 🔐 Auth required |
| `/checkout` | Payment & address | 🔐 Auth required |
| `/order-success/:id` | Order confirmation | 🔐 Auth required |
| `/orders` | Order history | 🔐 Auth required |
| `/orders/:id` | Order details | 🔐 Auth required |

---

## 💳 Razorpay Test Mode

Use these test card details in the Razorpay checkout popup:

| Field | Value |
|---|---|
| Card Number | `4111 1111 1111 1111` |
| Expiry | Any future date |
| CVV | Any 3 digits |
| OTP | `1234` |

> Payment flow: Frontend → create order (backend creates Razorpay order) → Razorpay popup → backend verifies HMAC signature → order marked PAID.

---

## 🛠️ Available Scripts

### Backend (`cd backend`)

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `node --watch index.js` | Dev server with auto-restart |
| `npm start` | `node index.js` | Production start |
| `npm run seed` | `node utils/seedProducts.js` | Seed 10 sample products |

### Frontend (`cd frontend`)

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Dev server on port 5173 |
| `npm run build` | `vite build` | Production build to `dist/` |
| `npm run preview` | `vite preview` | Preview production build |

---

## 📄 License

MIT — feel free to use, modify and share.

---

<div align="center">

Made with ❤️ using React + Node.js + MongoDB

</div>
