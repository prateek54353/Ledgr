const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- HELPER TO SIGN JWT ---
const signToken = (user) => {
  const payload = { user: { id: user.id } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
};

// --- TRADITIONAL REGISTRATION ---
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: 'User with this email or username already exists' });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
    const token = signToken(user);
    res.status(201).json({ token, email: user.email, currency: user.currency, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- TRADITIONAL LOGIN ---
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { username: identifier }] 
    }).select('+password');

    if (!user || !user.password) { // Check if user exists and has a password
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const token = signToken(user);
    res.json({ token, email: user.email, currency: user.currency, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- GOOGLE SIGN-IN ---
router.post('/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ googleId });

        if (!user) {
            user = await User.findOne({ email });

            if (user) {
                // If user exists with email, they must use their password unless they link accounts
                if (user.googleId) {
                    // This email is already associated with another Google account
                    return res.status(400).json({ msg: 'This email is linked to another Google account.' });
                }
                // Link existing local account to Google
                user.googleId = googleId;
                user.profilePicture = picture;
            } else {
                // --- MODIFICATION START: Generate a unique username ---
                // Create a base username from the email (e.g., 'john.doe@email.com' -> 'johndoe')
                let baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
                let potentialUsername = baseUsername;
                let userExists = await User.findOne({ username: potentialUsername });
                
                // If username is taken, append random numbers until it's unique
                while (userExists) {
                    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number
                    potentialUsername = `${baseUsername}${randomSuffix}`;
                    userExists = await User.findOne({ username: potentialUsername });
                }

                // Create the new user with the guaranteed unique username
                user = new User({
                    googleId,
                    email,
                    username: potentialUsername,
                    profilePicture: picture,
                });
                // --- MODIFICATION END ---
            }
            await user.save();
        }

        const token = signToken(user);
        res.json({ token, email: user.email, currency: user.currency, username: user.username });

    } catch (error) {
        console.error('Google auth error', error);
        res.status(401).json({ msg: 'Google authentication failed' });
    }
});


// --- GET CURRENT USER ---
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      currency: user.currency,
      profilePicture: user.profilePicture
    });
  } catch (error) {
     console.error(error);
     res.status(500).send('Server Error');
  }
});

module.exports = router;