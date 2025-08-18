const express = require('express');
const User = require('../models/User');
const challengeEngine = require('../utils/challengeEngine');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const challenges = challengeEngine(user);
    res.json({ challenges });
  } catch (err) {
    console.error('Challenges error:', err);
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

module.exports = router;
