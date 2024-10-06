const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Validate password using the isPasswordValid method
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role._id,  // Send role ID, role details can be fetched on frontend
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  login,
};
