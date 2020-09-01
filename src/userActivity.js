if (typeof(require) !== 'undefined') {
  // const UserRepository = require('../src/UserRepository');
  const moment = require('moment');
}

class UserActivity {
  constructor(userInfo, user) {
    this.userActivityInformation = userInfo;
    this.user = user.userData;
  }

  findSpecificStepsWalked(date) {
    return this.findStartDateInfo(date).numSteps;
  }

  findMilesWalkedSpecificDay(date) {
    let userSteps =
      this.findSpecificStepsWalked(date);
      // this.findStartDateInfo(date).numSteps;
      let userMilesWalked = (userSteps * this.user.strideLength) / 5280;
    return Math.round(userMilesWalked * 100) / 100;
  }

  findStartDateInfo(date) {
    return this.userActivityInformation.find(datum => datum['date'] === date);
  }
// this below functionality needs to be accessed higher up the scope chain

  userMinutesActive(date) {
    return this.findStartDateInfo(date).minutesActive;
  }

  minutesActiveWeekAverage(startDate, endDate) {
    const weeklySchedule = this.findActivityWeek(startDate, endDate);
    let minutesActiveWeekTotal = weeklySchedule.reduce((totalWeekMinutesActive, day) => {
      return totalWeekMinutesActive += day.minutesActive
    }, 0);
    return Math.floor(minutesActiveWeekTotal/7);
  }

  findActivityWeek(startDate, endDate) {
    return this.userActivityInformation.filter(day => {
      if(moment(day.date).isAfter(startDate) && moment(day.date).subtract(1, 'day').isBefore(endDate)) {
        return day;
      }
    })
  }

  findOutDayStepGoalReached(date) {
    let userSteps = this.findStartDateInfo(date).numSteps;
    return userSteps >= this.user.dailyStepGoal;
  }

  findAllDaysStepGoalExceeded() {
    let userStepGoal = this.user.dailyStepGoal;
    return this.userActivityInformation.filter(day => {
      if (day.numSteps > userStepGoal) {
        return day;
      }
    });
  }

  findAllTimeStairRecord() {
    let findStairsRecords = this.userActivityInformation.map(day => day.flightsOfStairs);
    let allTimeStairsRecord = this.userActivityInformation.find(day => {
      if (day.flightsOfStairs === Math.max(...findStairsRecords))
        return day;
      });
    return allTimeStairsRecord;
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = UserActivity;
}
