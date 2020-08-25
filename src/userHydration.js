const hydrationSamples = require('../data/hydrationSamples')
class UserHydration {
  constructor(userData) {
    this.userHydrationData = hydrationSamples.map(sample => {
      if (userData['id'] === sample['userID']) {
        return sample;
      }
    });
  }

}

module.exports = UserHydration;
