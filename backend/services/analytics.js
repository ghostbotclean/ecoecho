const User = require('../models/User');

module.exports = {
  getStats: async () => {
    const stats = await User.aggregate([{ $group: { _id: null, totalOffsets: { $sum: '$offsets' }, users: { $sum: 1 } } }]);
    return stats[0] || { totalOffsets: 0, users: 0 };
  }
};
