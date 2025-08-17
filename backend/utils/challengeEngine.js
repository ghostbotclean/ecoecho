module.exports = function getActiveChallenges(user) {
  return [
    { id: 'walk100km', goal: 100, progress: user.movementHistory.reduce((sum, m) => m.activity === 'walk' ? sum + m.distance : sum, 0), completed: false },
    { id: 'offset5x', goal: 5, progress: user.offsetAudit.length, completed: user.offsetAudit.length >= 5 }
  ];
};
