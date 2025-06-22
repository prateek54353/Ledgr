# Ledgr - Personal Finance Tracker

![Ledgr Logo](https://i.imgur.com/8t2sa78t2sa78t2s.jpg) 
A modern, full-stack personal finance tracker designed to help you manage your income and expenses with ease. Built with the MERN stack (MongoDB, Express, React, Node.js) and featuring a clean, responsive, and professional user interface powered by Material-UI.

**[Live Demo](https://YOUR_LIVE_VERCEL_URL_HERE)** ---

## Features

* **Secure Authentication:** Robust JWT-based authentication with password hashing (bcrypt).
* **Multiple Sign-In Options:** Users can sign up and log in using a traditional email/username and password combination or via a seamless one-click Google Sign-In (OAuth 2.0).
* **CRUD for Transactions:** Full Create, Read, and Delete functionality for income and expense transactions.
* **Dynamic Dashboard:** An interactive dashboard that provides a real-time summary of total income, expenses, and current balance.
* **Data Visualization:** A clean Doughnut chart provides an instant breakdown of expenses by category.
* **Multi-Currency Support:** Users can select their preferred currency, and all financial data will be displayed in the correct format using the `Intl.NumberFormat` API.
* **Professional UI/UX:** Built with Material-UI for a clean, modern, and responsive design that looks great on all devices.
* **Protected Routes:** Frontend routes are protected to ensure only authenticated users can access the dashboard and financial data.

---

## Screenshots

**Dashboard View**
![Dashboard Screenshot](https://i.imgur.com/YOUR_DASHBOARD_SCREENSHOT.png)

**Authentication Pages**
![Login Screenshot](https://i.imgur.com/YOUR_LOGIN_SCREENSHOT.png)

---

## Tech Stack

#### **Backend**
* **Node.js:** JavaScript runtime environment.
* **Express:** Web framework for Node.js.
* **MongoDB:** NoSQL database for storing user and transaction data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **JSON Web Tokens (JWT):** For securing the API.
* **Bcrypt.js:** For password hashing.
* **Google Auth Library:** For handling Google Sign-In token verification.
* **CORS, Dotenv**

#### **Frontend**
* **React.js:** A JavaScript library for building user interfaces.
* **Vite:** Next-generation frontend tooling for a fast development experience.
* **Material-UI (MUI):** A comprehensive suite of UI tools for a professional design system.
* **React Router:** For client-side routing.
* **Axios:** For making API requests to the backend.
* **Context API:** For global state management (user authentication).
* **Chart.js & react-chartjs-2:** For data visualization.
* **@react-oauth/google:** For Google Sign-In integration on the client.

---

## Local Setup and Installation

To run this project locally, follow these steps:

#### **Prerequisites**
* Node.js (v18.x or later)
* npm
* MongoDB Atlas account (or a local MongoDB instance)

#### **1. Clone the Repository**
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

#### **2. Backend Setup**
```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Create a .env file in the /server directory
# Add the following environment variables:
```
**`server/.env`**
```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SUPER_SECRET_RANDOM_STRING
GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
CLIENT_URL=http://localhost:5173
```

```bash
# Run the backend server
npm run dev
```
The backend will be running on `http://localhost:5000`.

#### **3. Frontend Setup**
*(Open a new, separate terminal window for this part)*
```bash
# Navigate to the client directory from the root folder
cd client

# Install frontend dependencies
npm install

# Create a .env.local file in the /client directory
# Add the following environment variable:
```
**`client/.env.local`**
```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
```

```bash
# Run the frontend development server
npm run dev
```
The frontend will be running on `http://localhost:5173`. Open this URL in your browser to use the application.

---

## Deployment

The application is deployed with a decoupled architecture:
* **Backend API** is deployed on **Render**.
* **Frontend Client** is deployed on **Vercel**.

The live application connects to the deployed backend via environment variables set in the Vercel project configuration.

---

## License

This project is licensed under the MIT License.
