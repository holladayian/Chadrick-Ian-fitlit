  // const moment = require('moment');

class UserHydration {
  constructor(userHydroInfo) {
    this.userHydrationInformation = userHydroInfo;
  }

  findAllTimeHydrationAverage() {
    let totalHydration = this.userHydrationInformation.reduce((accumulatedHydration, day) => {
      return accumulatedHydration += day.numOunces;
    }, 0);
    return Math.floor(totalHydration / this.userHydrationInformation.length);
  }

  findSpecificDayHydration(selectedDate) {
    return this.findStartDateInfo(selectedDate).numOunces;
  }

  findStartDateInfo(selectedDate) {
    return this.userHydrationInformation.find(day => day.date === selectedDate);
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

if (typeof(module) !== 'undefined') {
  module.exports = UserHydration;
}
