const sleepSamples = require('../data/sleepSamples');
const moment = require('moment');

class SleepRepository {
  constructor() {
    this.sleepInformation = sleepSamples;
  }
  findSleepWeek(startDate, endDate) {
    return sleepSamples.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }
}

module.exports = SleepRepository
