const express = require('express');
const User = require('../models/User');
const { mintNFT } = require('../services/solana');
const treeappOffset = require('../services/offsetProviders/treeapp');
const ecologiOffset = require('../services/offsetProviders/ecologi');
const pachamaOffset = require('../services/offsetProviders/pachama');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, emissionsKg, provider = 'treeapp' } = req.body;
  const user = await User.findOne({ userId });
  if (!user || emissionsKg <= 0) return res.status(400).json({ error: 'Invalid' });

  const trees = Math.ceil(emissionsKg / 20);
  let message = `Mock offset: ${trees} trees with ${provider} for ${emissionsKg}kg.`;

  try {
    let offsetResult;
    if (provider === 'treeapp') offsetResult = await treeappOffset(trees, userId);
    else if (provider === 'ecologi') offsetResult = await ecologiOffset(trees, userId);
    else if (provider === 'pachama') offsetResult = await pachamaOffset(trees, userId);

    if (offsetResult?.success === false) {
      message = offsetResult.message;
    } else if (offsetResult) {
      message = `Offset with ${provider}: ${trees} trees planted for ${emissionsKg}kg`;
    }

    const nftMint = await mintNFT(userId, `https://ecoecho.life/nft/${userId}?trees=${trees}`);
    user.badges.push({ name: 'EcoEgoNFT', level: Math.floor(trees / 5) || 1, earnedAt: new Date(), source: provider, metadataUrl: nftMint.metadataUrl });
    user.offsets += emissionsKg;
    user.footprint -= emissionsKg;
    user.ecoPoints += 5;
    user.offsetAudit.push({ provider, trees, timestamp: new Date() });
    await user.save();

    res.json({ message, ecoPoints: user.ecoPoints, badges: user.badges, nftMint: nftMint.tx });
  } catch (err) {
    console.error('Offset error:', err);
    res.status(500).json({ error: 'Offset failed' });
  }
});

module.exports = router;