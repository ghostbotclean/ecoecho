const express = require('express');
const User = require('../models/User');
const getGrokTip = require('../utils/grokTips');
const getArchetype = require('../utils/archetypeEngine');
const forecastFootprint = require('../utils/forecastEngine');
const geoScore = require('../utils/geoScore');
const calculateEcoEgo = require('../utils/ecoEgo');
const router = express.Router();

const emissionFactors = { drive: 0.2, bike: 0.0, walk: 0.0, flight: 0.25, train: 0.04 };

router.post('/', async (req, res) => {
  const { userId, distance, speed, location, deviceType, mode } = req.body;
  if (!userId || isNaN(distance) || isNaN(speed)) return res.status(400).json({ error: 'Invalid input' });

  const activity = mode || (speed > 30 ? 'drive' : speed > 10 ? 'bike' : 'walk');
  let emissions = emissionFactors[activity] * distance || 0;

  let user = await User.findOne({ userId }) || new User({ userId });
  user.footprint += emissions;
  user.credits += Math.floor(20 / (emissions + 1));
  user.ecoPoints += geoScore(location, activity);
  user.movementHistory.push({ timestamp: new Date(), distance, speed, activity, emissions, location, deviceType, mode });

  user.archetype = getArchetype(user.movementHistory, user.offsetAudit);
  user.forecast = forecastFootprint(user.movementHistory);
  user.emotionalScore = calculateEcoEgo(user.movementHistory, user.offsetAudit);

  await user.save();

  res.json({
    emissions: emissions.toFixed(2),
    totalFootprint: user.footprint.toFixed(2),
    credits: user.credits,
    ecoPoints: user.ecoPoints,
    archetype: user.archetype,
    forecast: user.forecast,
    emotionalScore: user.emotionalScore,
    tip: getGrokTip(user.footprint, user.archetype)
  });
});

module.exports = router;
