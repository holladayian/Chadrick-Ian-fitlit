const moment = require('moment');
const UserRepository = require('../src/UserRepository');

class UserActivity {
  constructor(user) {
    this.userActivityInformation = user;
  }
  // For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
  // Should this be a Time class feature?
  // I need to calculate miles walked using number of steps, where each step equals the strid length from the userSamples
  findMilesWalkedSpecificDay(date) {
    let userSteps = this.findStartDateInfo(date).numSteps;
    let userStrideLength = this.findUserStride();
    let userMilesWalked = (userSteps * userStrideLength) / 5280;
    return Math.round(userMilesWalked * 100) / 100;
  }
  findStartDateInfo(date) {
    return this.userActivityInformation.find(datum => datum['date'] === date);
  }
  findUserStride() {
    return new UserRepository().findUserInfo(this.userActivityInformation[0].userID).strideLength;
  }
  userMinutesActive(date) {
    return this.findStartDateInfo(date).minutesActive;
  }
  //Below: For a user, how many minutes active did they average for a given week (7 days)?
  minutesActiveWeekAverage(startDate, endDate) {
    const weeklySchedule = this.findSleepWeek(startDate, endDate);
    let minutesActiveWeekTotal = weeklySchedule.reduce((totalWeekMinutesActive, day) => {
      return totalWeekMinutesActive += day.minutesActive
    }, 0);
    return Math.floor(minutesActiveWeekTotal/7);
  }
  findSleepWeek(startDate, endDate) {
    return this.userActivityInformation.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }
  //Below: For a user, did they reach their step goal for a given day (specified by a date)?
  // findOutDayStepGoalReached() {
  //
  // }
  //Below: For a user, find all the days where they exceeded their step goal
  // findDaysStepGoalExceeded() {
  //
  // }
  //Below: For a user, find their all-time stair climbing record
  // findAllTimeStairRecord() {
  //
  // }
}

module.exports = UserActivity;
