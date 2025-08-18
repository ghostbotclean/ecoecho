module.exports = function valleyGrowth(offsets) {
  const treeCount = Math.floor(offsets / 5); // 1 tree per 5kg offset
  const cloudCount = Math.floor(treeCount / 10); // 1 cloud per 10 trees
  const level = treeCount > 100 ? 'lush' : treeCount > 50 ? 'mature' : 'sapling';
  return { trees: treeCount, clouds: cloudCount, level };
};
