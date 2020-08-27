const hydrationSamples = require('../data/hydrationSamples');

class UserHydration {
  constructor(user) {
    this.userHydrationInformation = hydrationSamples.filter(sample => {
      if (user.id === sample['userID']) {
        return sample;
      }
    });
  }

  findAllTimeHydrationAverage() {
    let totalHydration = 0;
    this.userHydrationInformation.forEach(day => totalHydration
      += day.numOunces);
      // maybe use reduce instead of forEach
    return Math.floor(totalHydration / this.userHydrationInformation.length);
  }

  findSpecificDayHydration(date) {
    return this.findStartDateInfo(date).numOunces;
  }

  findStartDateInfo(date) {
    return this.userHydrationInformation.find(datum => datum['date'] === date);
  }

  weeklyHydration(date) {
    let startDate = this.findStartDateInfo(date).date;
    let dates = this.userHydrationInformation.map(day => day.date);
    let week = dates.reverse().slice(startDate, 7);
  // make sure there is an enrty for every date
  // would this be on the dashboard?
    let weeklySchedule = this.userHydrationInformation.filter(day => {
      if (week.includes(day.date)) {
        return day.numOunces;
      }
    });
    return weeklySchedule.map(day => day.numOunces);
  }
}

module.exports = UserHydration;
