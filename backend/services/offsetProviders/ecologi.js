const fetch = require('node-fetch');

module.exports = async (trees, userId) => {
  if (!process.env.ECOLOGI_KEY) return { success: false, message: 'No Ecologi key' };
  const res = await fetch('https://api.ecologi.com/plant-trees', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.ECOLOGI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: trees, userId })
  });
  return res.json();
};