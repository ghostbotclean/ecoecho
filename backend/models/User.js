const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: String,
  level: Number,
  earnedAt: Date,
  source: String
});

const movementSchema = new mongoose.Schema({
  timestamp: Date,
  distance: Number,
  speed: Number,
  activity: String,
  emissions: Number,
  location: {
    lat: Number,
    lng: Number
  },
  deviceType: String,
  mode: String
});

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: String,
  footprint: { type: Number, default: 0 },
  credits: { type: Number, default: 0 },
  ecoPoints: { type: Number, default: 0 },
  badges: [badgeSchema],
  offsets: { type: Number, default: 0 },
  offsetAudit: Array,
  movementHistory: [movementSchema],
  notificationFreq: { type: String, default: 'daily' },
  autoOffset: { type: String, default: 'off' },
  autoOffsetProvider: { type: String, default: 'treeapp' },
  premium: { type: Boolean, default: false },
  stripeSubId: String,
  dataConsent: { type: Boolean, default: false },
  anonymizedId: String,
  archetype: String,
  forecast: Object,
  emotionalScore: Object,
  challenges: Array
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
