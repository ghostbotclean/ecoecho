module.exports = function getArchetype(movementHistory, offsetAudit) {
  const km = movementHistory.reduce((sum, m) => sum + m.distance, 0);
  const offsets = offsetAudit.length;
  if (km > 100 && offsets > 5) return 'Eco Warrior';
  if (offsets > 10 && km < 50) return 'Carbon Strategist';
  return 'Data Minimalist';
};
