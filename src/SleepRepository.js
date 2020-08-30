const sleepSamples = require('../data/sleepSamples');
const UserSleep = require('../src/userSleep');
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
  obtainUser(id) {
    return this.sleepInformation.filter(userInfo => {
      if (userInfo.userID === id) {
        return userInfo

      }
    })
  }
  instantiateUserSleep(id) {
    return new UserSleep(this.obtainUser(id));
  }

  findAllUsersAverageSleepQuality() {
    // const weeklySchedule = this.findSleepWeek(startDate, endDate);
    // let allUserIDs = sleepSamples.map(user => user.userID);
    // let individualUserIDs = Array.from(new Set(allUserIDs));
    // let sleepUsers = individualUserIDs.map(sleepUserID => this.instantiateUserSleep(sleepUserID));
    // let totalSleepQuality = sleepUsers.reduce((sleepQualityTotal, sleepUser) => {
    //   // console.log(user.userSleepInformation.map(day => day.sleepQuality));
    //   return sleepQualityTotal += sleepUser.userSleepInformation.map(day => day.sleepQuality).reduce((usersDays, sleepForADay) => {
    //     return usersDays += sleepForADay
    //   }, 0);
    // }, 0)
    let totalSleepQuality = this.sleepInformation.reduce((sleepQualityTotal, sleepQualityDay) => {
      return sleepQualityTotal += sleepQualityDay.sleepQuality
    }, 0)

    // let usersWeeks = individualUserIDs.map(sleepUser => this.instantiateUserSleep(sleepUser));

    console.log(totalSleepQuality / this.sleepInformation.length);

    return totalSleepQuality;

    // specificUsersWeek.map(specificUser => this.)
    // return specificUsersWeek;
  }

}

module.exports = SleepRepository
