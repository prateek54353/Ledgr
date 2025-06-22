const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Our auth middleware
const Transaction = require('../models/Transaction');

// @route   GET /api/transactions
// @desc    Get all transactions for the logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Find transactions that belong to the logged-in user (req.user.id is from the middleware)
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', protect, async (req, res) => {
  const { type, category, amount, date } = req.body;

  try {
    const newTransaction = new Transaction({
      user: req.user.id,
      type,
      category,
      amount,
      date,
    });

    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    // Ensure the user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await transaction.deleteOne();

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;