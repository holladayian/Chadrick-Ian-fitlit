const sleepSamples = require('../data/sleepSamples');

class UserSleep {
  constructor(user) {
    this.userSleepInformation = sleepSamples.filter(sample => {
      if (user.id === sample['userID']) {
        return sample;
      }
    });
  }
  findAllTimeHoursSleptAverage() {
    let totalSleepHours = 0;
    this.userSleepInformation.forEach(day => totalSleepHours
      += day.hoursSlept);
    // maybe use reduce instead of forEach
    return Math.floor(totalSleepHours / this.userSleepInformation.length);
  }
  findAllTimeSleepQualityAverage() {
    let totalSleepQuality = 0;
    this.userSleepInformation.forEach(day => totalSleepQuality
    += day.sleepQuality);
    // maybe use reduce instead of forEach
    return Math.floor(totalSleepQuality / this.userSleepInformation.length);
  }
  findSpecificDaySleepHours(date) {
    return this.findStartDateInfo(date).hoursSlept;
  }
  findSpecificDaySleepQuality(date) {
    return this.findStartDateInfo(date).sleepQuality;
  }
  findStartDateInfo(date) {
    return this.userSleepInformation.find(datum => datum['date'] === date);
  }
}


module.exports = UserSleep;
