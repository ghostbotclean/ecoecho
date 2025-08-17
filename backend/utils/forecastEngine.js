module.exports = function forecastFootprint(movementHistory) {
  const lastWeek = movementHistory.filter(m => Date.now() - new Date(m.timestamp) < 7 * 86400000);
  const avg = lastWeek.reduce((sum, m) => sum + m.emissions, 0) / (lastWeek.length || 1);
  return { weeklyForecast: avg.toFixed(2), monthlyForecast: (avg * 4).toFixed(2) };
};
