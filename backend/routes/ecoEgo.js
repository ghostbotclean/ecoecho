const express = require('express');
const User = require('../models/User');
const valleyGrowth = require('../utils/valleyGrowth');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valley = valleyGrowth(user.offsets);
    res.json({ badges: user.badges, offsets: user.offsets, valley });
  } catch (err) {
    console.error('EcoEgo error:', err);
    res.status(500).json({ error: 'Failed to fetch ecoEgo' });
  }
});

module.exports = router;
