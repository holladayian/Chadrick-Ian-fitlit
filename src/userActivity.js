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
}

module.exports = UserActivity;
