const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/currency/list
// @desc    Get a list of all available currencies
// @access  Public
router.get('/list', async (req, res) => {
  try {
    // Using the Frankfurter API, which is free and doesn't require an API key
    const response = await axios.get('https://api.frankfurter.app/currencies');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching currencies:', error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/currency/user
// @desc    Update the logged-in user's currency preference
// @access  Private
router.put('/user', protect, async (req, res) => {
  const { currency } = req.body;

  if (!currency) {
    return res.status(400).json({ msg: 'Currency code is required' });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.currency = currency;
    await user.save();

    res.json({ msg: 'Currency updated successfully', currency: user.currency });
  } catch (error) {
    console.error('Error updating currency:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;