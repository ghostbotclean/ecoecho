module.exports = function calculateEcoEgo(movementHistory, offsetAudit) {
  const pride = offsetAudit.length * 2; // Pride from offsets
  const guilt = movementHistory.reduce((sum, m) => sum + (m.emissions > 2 ? 1 : 0), 0); // Guilt from high-emission activities
  const motivation = movementHistory.length + offsetAudit.length; // Motivation from activity and offsets
  const score = pride + motivation - guilt;
  const mood = score > 0 ? 'empowered' : 'concerned';
  return { pride, guilt, motivation, score, mood };
};
