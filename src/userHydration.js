const hydrationSamples = require('../data/hydrationSamples')
class UserHydration {
  constructor(userData) {
    this.userHydrationData = hydrationSamples.filter(sample => {
      if (userData[0].id === sample['userID']) {
      return sample;
      }
    });
  }
}

module.exports = UserHydration;
