const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ archetype: user.archetype });
  } catch (err) {
    console.error('Archetype error:', err);
    res.status(500).json({ error: 'Failed to fetch archetype' });
  }
});

module.exports = router;
