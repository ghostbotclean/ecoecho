const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, autoOffset, provider } = req.body;
  const user = await User.findOne({ userId });
  if (!user || !user.premium) return res.status(400).json({ error: 'Premium required' });

  user.autoOffset = autoOffset;
  user.autoOffsetProvider = provider || 'treeapp';
  await user.save();

  res.json({ message: 'Auto-offset set' });
});

module.exports = router;
