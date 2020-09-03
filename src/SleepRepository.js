  // const UserSleep = require('../src/userSleep');
  // const moment = require('moment');


class SleepRepository {
  constructor(sleepRepoInfo) {
    this.sleepInformation = sleepRepoInfo;
  }
  findSleepWeek(startDate, endDate) {
    return this.sleepInformation.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }
  obtainUser(id) {
    return this.sleepInformation.filter(userInfo => {
      if (userInfo.userID === id) {
        return userInfo;

      }
    })
  }
  instantiateUserSleep(id) {
    return new UserSleep(this.obtainUser(id));
  }

  findAllUsersAverageSleepQuality() {
    const totalSleepQuality = this.sleepInformation.reduce((sleepQualityTotal, sleepQualityDay) => {
      return sleepQualityTotal += sleepQualityDay.sleepQuality
    }, 0)
    let totalSleepQualityAverage = totalSleepQuality / this.sleepInformation.length;
    return Math.floor(totalSleepQualityAverage);
  }

  instantiateAllUsers() {
    let allUserIDs = this.sleepInformation.map(user => user.userID);
    let individualUserIDs = Array.from(new Set(allUserIDs));
    return individualUserIDs.map(sleepUserID => this.instantiateUserSleep(sleepUserID));
  }

  findSleepQualitiesAverageGreaterThanThree(startDay, endDay) {
    let sleepUsers = this.instantiateAllUsers();
    let individualSleepUsersQualityAverageForAWeek = sleepUsers.map(sleepUser => sleepUser.userWeeklySleepQualityAverage(startDay, endDay));
    let yoohoosGreaterThanThree = individualSleepUsersQualityAverageForAWeek.filter(averageSleepQualitiesForAWeek => {
      if (averageSleepQualitiesForAWeek > 3) {
        return averageSleepQualitiesForAWeek
      }
    })
    return yoohoosGreaterThanThree;
  }

  whoIsTheSleepOutlier(day, direction) {
    let sleepUsers = this.instantiateAllUsers();
    let sleepUsersDay = sleepUsers.map(sleepUser => sleepUser.findStartDateInfo(day));
    let listOfHoursSlept = sleepUsersDay.map(sleepUserHours => sleepUserHours.hoursSlept);
    let sleepOutlier = sleepUsersDay.find(sleepUser => {
      if (sleepUser.hoursSlept === Math[`${direction}`](...listOfHoursSlept)) {
        return sleepUser
      }
    })
    return sleepOutlier
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = SleepRepository;
}
