const fetch = require('node-fetch');

module.exports = async (trees, userId) => {
  if (!process.env.PACHAMA_KEY) return { success: false, message: 'No Pachama key' };
  const res = await fetch('https://api.pachama.com/plant', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.PACHAMA_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ trees, userId })
  });
  return res.json();
};
