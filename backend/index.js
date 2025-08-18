require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Or false if you prefer the old behavior
const morgan = require('morgan');
const cron = require('node-cron');
const User = require('./models/User');
const { mintNFT } = require('./services/solana');
const { sendPush } = require('./services/notifications');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// Routes (to be added in next steps)
app.use('/autotrack', require('./routes/track'));
app.use('/offset', require('./routes/offset'));
app.use('/subscribe', require('./routes/subscribe'));
app.use('/setAutoOffset', require('./routes/autoOffset'));
app.use('/validator', require('./routes/validator'));
app.use('/archetype', require('./routes/archetype'));
app.use('/forecast', require('./routes/forecast'));
app.use('/challenges', require('./routes/challenges'));
app.use('/ecoEgo', require('./routes/ecoEgo'));
app.use('/leaderboard', require('./routes/leaderboard'));

// Health Check
app.get('/health', (req, res) => res.json({ status: 'alive', uptime: process.uptime() }));

// Auto-offset Cron Job
cron.schedule('* * * * *', async () => {
  const users = await User.find({ premium: true, autoOffset: { $ne: 'off' } }).limit(10);
  for (const user of users) {
    if (user.footprint <= 0) continue;
    try {
      const offsetRes = await fetch(`http://localhost:${process.env.PORT || 3000}/offset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId, emissionsKg: user.footprint, provider: user.autoOffsetProvider })
      });
      const data = await offsetRes.json();
      await sendPush(user.userId, `🌱 Auto-offset: ${data.message}`);
      console.log(`🌱 Auto-offset for ${user.userId}: ${data.message}`);
    } catch (err) {
      console.error(`⚠️ Offset failed for ${user.userId}:`, err.message);
    }
  }
}, { scheduled: true, timezone: 'UTC' });

// Start Server
app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log(`🚀 EcoEcho backend running on port ${process.env.PORT || 3000}`));
