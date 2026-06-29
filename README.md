# 👑 Crown Stores Retail Management System (CSRMS)

A full-stack web application for managing retail supermarket operations, built with Node.js, Express, MySQL, and vanilla HTML/CSS/JavaScript.

---

## 🚀 Features

- Role-Based Authentication — 3 user roles with JWT security
- Categories & Products Management — Full CRUD operations
- Procurement Module — Record supplier deliveries with automatic stock updates
- Inventory Management — Real-time stock tracking with audit logs
- Sales Processing — Cash sales with automatic stock deduction and receipt generation
- PDF Receipts — Professional downloadable receipts via jsPDF
- Barcode Scanner — Live camera scanning using QuaggaJS
- Advanced Analytics Dashboard — Charts, top products, low stock alerts
- Dark Mode — Toggle on Director dashboard
- Reports — Daily sales, inventory, procurement, and summary reports

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express.js |
| Database | MySQL (via XAMPP) |
| Frontend | HTML + CSS + JavaScript |
| Authentication | JWT + bcryptjs |
| PDF | jsPDF |
| Charts | Chart.js |
| Barcode | QuaggaJS |
| Version Control | Git + GitHub |

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [XAMPP](https://www.apachefriends.org/) (for MySQL database)
- [VS Code](https://code.visualstudio.com/) with Live Server extension

---

## 📦 Installation & Setup

### 1. Clone the Repository
git clone https://github.com/Muzan276/crown_stores_system.git
cd crown_stores_system
### 2. Install Dependencies
npm install
### 3. Start XAMPP
- Open XAMPP Control Panel
- Start Apache and MySQL

### 4. Create the Database
- Go to: http://localhost/phpmyadmin
- Create database named: crown_stores_db
- Run the SQL from the /config/db.js comments to create all 7 tables

### 5. Configure Environment Variables
Create a .env file:
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=crown_stores_db
PORT=5000
JWT_SECRET=crownstores_secret_key_2026
### 6. Start the Server
node server.js
### 7. Open the Application
- Right-click frontend/index.html in VS Code
- Select Open with Live Server

---

## 👤 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Director | director | 123456 |
| Branch Manager | branch_manager | 1234567 |
| Sales Agent | sales_agent1 | 12345678 |

---

## 📁 Project Structure

crown_stores_system/
├── config/db.js
├── controllers/
├── middleware/authMiddleware.js
├── models/
├── routes/
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── pages/
├── server.js
└── .env
---

## 🔐 Security

- Passwords hashed with bcryptjs
- All routes protected with JWT tokens
- Role-based access via middleware

---

## 👩‍💻 Developer

Muzan Mohammed
GitHub: [github.com/Muzan276/crown_stores_system](https://github.com/Muzan276/crown_stores_system)