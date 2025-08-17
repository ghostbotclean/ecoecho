const Expo = require('expo-server-sdk').Expo;

module.exports = {
  sendPush: async (userId, message) => {
    const expo = new Expo();
    const somePushTokens = ['ExponentPushToken[xxx]']; // Add real tokens
    const messages = [];
    for (let pushToken of somePushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) continue;
      messages.push({ to: pushToken, sound: 'default', body: message });
    }
    await expo.sendPushNotificationsAsync(messages);
  }
};
