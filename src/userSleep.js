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
  weeklySleepHours(date) {
    let startDate = this.findStartDateInfo(date).date;
    let dates = this.userSleepInformation.map(day => day.date);
    let week = dates.reverse().slice(startDate, 7);
    // make sure there is an enrty for every date
    // would this be on the dashboard?
    let weeklySchedule = this.userSleepInformation.filter(day => {
      if (week.includes(day.date)) {
        return day.hoursSlept;
      }
    });
    return weeklySchedule.map(day => day.hoursSlept);
  }
  weeklySleepQuality(date) {
    let startDate = this.findStartDateInfo(date).date;
    let dates = this.userSleepInformation.map(day => day.date);
    let week = dates.reverse().slice(startDate, 7);
    // make sure there is an enrty for every date
    // would this be on the dashboard?
    let weeklySchedule = this.userSleepInformation.filter(day => {
      if (week.includes(day.date)) {
        return day.sleepQuality;
      }
    });
    return weeklySchedule.map(day => day.sleepQuality);
  }
  averageUserSleepQuality() {
    let totalSleepQuality = sleepSamples.reduce((sum, sample) => {
      sum += sample.sleepQuality;
      return sum;
    },0);
    return totalSleepQuality/sleepSamples.length;
  }
  findAllUsersAverageSleepQuality() {
    // we will need to get every user their own instance to access the weeklySleepquality method for each of them.
    //sleepSamples.forEach(user => user.userid )
    let userIDs = sleepSamples.map(user => user.userID);
    console.log(userIDs);
    return userIDs;

    // we will need to use weekly sleep quality function to get the week sleepQuality values and divide by length of values array created, for each user.
  }
}


module.exports = UserSleep;
