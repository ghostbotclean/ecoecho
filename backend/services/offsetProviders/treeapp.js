const fetch = require('node-fetch');

module.exports = async (trees, userId) => {
  if (!process.env.TREEAPP_KEY) return { success: false, message: 'No Treeapp key' };
  const res = await fetch('https://api.treeapp.org/plant', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.TREEAPP_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ trees, user: userId })
  });
  return res.json();
};
