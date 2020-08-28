const hydrationSamples = require('../data/hydrationSamples');
const moment = require('moment');

class UserHydration {
  constructor(user) {
    this.userHydrationInformation = hydrationSamples.filter(sample => {
      if (user.id === sample['userID']) {
        return sample;
      }
    });
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

  weeklyHydration(date) {
    let week = this.userHydrationInformation.filter(day => {
      if(moment(day.date).isAfter("2019/06/15") && moment(day.date).subtract(1, 'day').isBefore("2019/06/22")) {
        return day
      }
    })
    return week.map(day => day.numOunces);
  }
}

module.exports = UserHydration;
