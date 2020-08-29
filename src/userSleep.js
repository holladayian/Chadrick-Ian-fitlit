const sleepSamples = require('../data/sleepSamples');
const moment = require('moment');

class UserSleep {
  constructor(user) {
    this.userSleepInformation = sleepSamples.filter(sample => {
      if (user.id === sample['userID']) {
        return sample;
      }
    });
    // the functionality for the above should be in a SleepRepository class

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

  // the below method should only deal with this.userSleepInformation, not sleepSamples
  // theis method shoiuld be copied into SleepRepository
  // there, we will filter with sleepSamples

  findSleepWeek(startDate, endDate) {
    return sleepSamples.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }

  // I think we should actually be able to remove the below method

  checkForSpecificUser(weeklySchedule, userID) {
    return weeklySchedule.filter(specificUser => {
      if(specificUser.userID === userID) {
        return specificUser
      }
    })
  }

  specificUserWeeklySleepHours(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    // the below code will be cleaned up, because we will only be dealing with one specific user in this class
    const specificUserWeeklySchedule = this.checkForSpecificUser(weeklySchedule, this.userSleepInformation[0].userID);
    return specificUserWeeklySchedule.map(day => day.hoursSlept);
  }


  specificUserWeeklySleepQuality(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    // the below code will be cleaned up, because we will only be dealing with one specific user in this class

    const specificUserWeeklySchedule = this.checkForSpecificUser(weeklySchedule, this.userSleepInformation[0].userID);
    return specificUserWeeklySchedule.map(day => day.sleepQuality);
  }

// the below method should only reduce for a specific user
// the methodology for finding errbodysAverageSleepQuality should be in SleepRepository
// copy this and use sleepSamples.reduce...
// this method will no longer need a parameter



  averageUserSleepQuality(user) {
    // here we can just this.userSleepInformation.reduce...
    let information = user || sleepSamples;
    // rename information
    let totalSleepQuality = information.reduce((sum, sample) => {
      sum += sample.sleepQuality;
      return sum;
    },0);
    return Math.floor(totalSleepQuality/information.length);
    // we might have to get rid of Math.floor, or use a method to get the 2nd decimal point
  }


// the below method should live in SleepRepository

  findAllUsersAverageSleepQuality(startDate, endDate) {
    // we will need to get every user their own instance to access the weeklySleepquality method for each of them.
    //sleepSamples.forEach(user => user.userid )
    const weeklySchedule = this.findSleepWeek(startDate, endDate);

    let allUserIDs = sleepSamples.map(user => user.userID);
    let individualUserIDs = Array.from(new Set(allUserIDs));
    let specificUsersWeek = individualUserIDs.map(specificUser => this.checkForSpecificUser(weeklySchedule, specificUser));
    // console.log(weeklySchedule);
    console.log(specificUsersWeek);
    let someStuffIdkWhatItsGonnaBeCalled = specificUsersWeek.map(specificUsersWeek => this.averageUserSleepQuality(specificUsersWeek));
    console.log(someStuffIdkWhatItsGonnaBeCalled);
    return someStuffIdkWhatItsGonnaBeCalled;

    // specificUsersWeek.map(specificUser => this.)
    // return specificUsersWeek;

    // we will need to use weekly sleep quality function to get the week sleepQuality values and divide by length of values array created, for each user.
  }




}



module.exports = UserSleep;
