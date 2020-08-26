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
  specificDayHydration(date) {
    let specificDayOunces;
    this.userHydrationData.filter(datum => {
      if (datum.date === date) {
        specificDayOunces = datum.numOunces;
      }
    });
    return specificDayOunces;
  }
  weeklyHydration(date) {
    this.userHydrationData.filter(datum =>
      if (datum.date === date) {
        return datum.numOunces; //incomplete
      })
  }
}

module.exports = UserHydration;
