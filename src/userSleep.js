  // const moment = require('moment');

class UserSleep {
  constructor(user) {
    this.userSleepInformation = user;
  }

  findAllTimeHoursSleptAverage() {
    let totalSleepHours = this.userSleepInformation.reduce((sleepHours, day) => {
      return sleepHours += day.hoursSlept;
    }, 0);
    return Math.floor(totalSleepHours / this.userSleepInformation.length);
  }

  findAllTimeSleepQualityAverage() {
    let totalSleepQuality = this.userSleepInformation.reduce((sleepQuality, day) => {
       return sleepQuality += day.sleepQuality;
     }, 0);
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

  findSleepWeek(startDate, endDate) {
    return this.userSleepInformation.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }

  specificUserWeeklySleepHours(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    return weeklySchedule.map(day => day.hoursSlept);
  }

  specificUserWeeklySleepQuality(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    return weeklySchedule.map(day => day.sleepQuality);
  }

  userWeeklySleepQualityAverage(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    let overallWeekQuality = weeklySchedule.reduce((totalWeekQuality, day) => {
      return totalWeekQuality += day.sleepQuality
    }, 0);
    return overallWeekQuality/7
  }

  averageUserSleepQuality(user) {
    let totalSleepQuality = this.userSleepInformation.reduce((sum, sample) => {
      sum += sample.sleepQuality;
      return sum;
    },0);
    return Math.floor(totalSleepQuality/this.userSleepInformation.length);
    // we might have to get rid of Math.floor, or use a method to get the 2nd decimal point
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = UserSleep;
}
