const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS)
// This allows your React frontend to communicate with this backend
app.use(cors());

// Enable Express to parse JSON data in the request body
app.use(express.json());


// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

// Call the database connection function
connectDB();


// --- API Routes ---
// A simple welcome route for the API root
app.get('/', (req, res) => {
  res.send('Personal Finance Tracker API is running...');
});

// Mount the authentication routes
// All routes defined in './routes/auth' will be prefixed with '/api/auth'
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions')); // <-- ADD THIS LINE
app.use('/api/currency', require('./routes/currency')); // <-- ADD THIS LINE
// We will add more routes here later (e.g., for transactions)


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});