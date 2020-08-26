const hydrationSamples = require('../data/hydrationSamples')
class UserHydration {
  constructor(userData) {
    this.userHydrationData = hydrationSamples.filter(sample => {
      if (userData[0].id === sample['userID']) {
        return sample;
      }
    });
  }
  allTimeHydrationAverage() {
    let totalHydration = 0;
    this.userHydrationData.forEach(datum => totalHydration
      += datum.numOunces);
    return Math.floor(totalHydration / this.userHydrationData.length);
  }
}

module.exports = UserHydration;
