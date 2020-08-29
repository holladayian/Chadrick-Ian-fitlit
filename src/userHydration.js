const hydrationSamples = require('../data/hydrationSamples');
const moment = require('moment');

class UserHydration {
  constructor(user) {
    this.userHydrationInformation = hydrationSamples.filter(sample => {
      if (user.id === sample['userID']) {
        return sample;
      }
    });
    // the functionality for the above should be in a HydrationRepository class
  }

  findAllTimeHydrationAverage() {
    let totalHydration = this.userHydrationInformation.reduce((accumulator, day) => {
      return accumulator += day.numOunces;
    }, 0);
    return Math.floor(totalHydration / this.userHydrationInformation.length);
  }

  findSpecificDayHydration(date) {
    return this.findStartDateInfo(date).numOunces;
  }

  findStartDateInfo(date) {
    return this.userHydrationInformation.find(datum => datum['date'] === date);
  }

  findHydrationWeek(startDate, endDate) {
    return this.userHydrationInformation.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }

  weeklyHydration(startDate, endDate) {
    let week = this.findHydrationWeek(startDate, endDate);
    return week.map(day => day.numOunces);
  }
}

module.exports = UserHydration;
