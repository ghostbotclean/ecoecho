const express = require('express');
const { stripe } = require('../services/stripe');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, email, autoOffset, provider } = req.body;
  try {
    if (!userId || !email) {
      return res.status(400).json({ error: 'userId and email are required' });
    }
    const customer = await stripe.customers.create({ email });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }]
    });
    const user = await User.findOneAndUpdate(
      { userId },
      { premium: true, stripeSubId: subscription.id, autoOffset, autoOffsetProvider: provider },
      { upsert: true, new: true }
    );
    res.json({ message: 'Premium activated!', user });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
