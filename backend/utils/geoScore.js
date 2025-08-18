module.exports = function geoScore(location, activity) {
  const base = activity === 'walk' ? 2 : activity === 'bike' ? 1.5 : activity === 'drive' ? 1 : activity === 'flight' ? 0.5 : activity === 'train' ? 1.2 : 1;
  const multiplier = location && location.lat ? (location.lat > 50 ? 1.2 : 1) : 1; // Default to 1 if location or lat is undefined
  return base * multiplier;
};