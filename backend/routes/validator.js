const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const data = await User.find({ dataConsent: true }, 'anonymizedId movementHistory');
    res.json(data);
  } catch (err) {
    console.error('Validator error:', err);
    res.status(500).json({ error: 'Failed to fetch validated data' });
  }
});

module.exports = router;
