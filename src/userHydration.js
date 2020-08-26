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
    // (identified by their userID - this is the same for all methods requiring a specific user’s data)
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
  let startDateData = this.userHydrationData.find(datum => datum['date'] === date);
  let startDate = startDateData['date'];
  let dates = this.userHydrationData.map(datum => datum.date);
  let week = dates.reverse().slice(startDate, 7);
  let weeklySchedule = this.userHydrationData.filter(datum => {
    if(week.includes(datum.date)) {
      return datum.numOunces
    }
  });
  let ouncesPerDayForWeek = weeklySchedule.map(datum => datum.numOunces);
  return ouncesPerDayForWeek;
  }
}

module.exports = UserHydration;
