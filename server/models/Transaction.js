const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // Link the transaction to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'], // Can only be one of these two values
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive number'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', TransactionSchema);