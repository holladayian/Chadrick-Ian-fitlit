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
      console.log(id);
      if (userInfo.userID === id) {
        return userInfo

      }
    })
  }
  instantiateUserSleep(id) {
    return new UserSleep(this.obtainUser(id));
  }

  findAllUsersAverageSleepQuality(startDate, endDate) {
    // we will need to get every user their own instance to access the weeklySleepquality method for each of them.
    //sleepSamples.forEach(user => user.userid )
    const weeklySchedule = this.findSleepWeek(startDate, endDate);

    let allUserIDs = sleepSamples.map(user => user.userID);
    let individualUserIDs = Array.from(new Set(allUserIDs));
    // console.log(individualUserIDs);
    // console.log(this.instantiateUserSleep(1));
    let usersWeeks = individualUserIDs.map(sleepUser => this.instantiateUserSleep(sleepUser));

    // console.log(weeklySchedule);
    // console.log(userWeeks);
    console.log(usersWeeks[0].userSleepInformation);
    return usersWeeks;
    // let someStuffIdkWhatItsGonnaBeCalled = specificUsersWeek.map(specificUsersWeek => userSleep.averageUserSleepQuality(specificUsersWeek));
    // console.log(someStuffIdkWhatItsGonnaBeCalled);
    // return someStuffIdkWhatItsGonnaBeCalled;

    // specificUsersWeek.map(specificUser => this.)
    // return specificUsersWeek;

    // we will need to use weekly sleep quality function to get the week sleepQuality values and divide by length of values array created, for each user.
  }

}

module.exports = SleepRepository
