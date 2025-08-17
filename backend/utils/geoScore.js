module.exports = function geoScore(location, activity) {
  const base = { walk: 2, bike: 1.5, drive: 1, flight: 0.5, train: 1.2 }[activity] || 1;
  const multiplier = location.lat > 50 ? 1.2 : 1; // UK bonus
  return base * multiplier * (1 + (Math.random() - 0.5) * 0.1); // Slight randomness
};
