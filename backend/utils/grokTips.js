module.exports = function getGrokTip(footprint, archetype = 'default') {
  const tips = {
    default: [`Grok says: Your ${footprint.toFixed(2)}kg footprint—carpool to save 2kg!`, `Walk short trips, eco-warrior—Grok’s tip!`, `Offset your week with Ecologi—smart move!`],
    'Eco Warrior': [`Grok roars: Crush it—plant 5 trees!`, `Share your EcoEgo badge!`],
    'Carbon Strategist': [`Grok nods: Smart offsets—optimize your footprint.`, `Data shows you’re leading!`]
  };
  const selected = tips[archetype] || tips.default;
  return selected[Math.floor(Math.random() * selected.length)];
};
