const UserActivity = require('../src/UserActivity');
const activitySamples = require('../data/activitySamples');

class ActivityRepository {
  constructor() {
    this.activityInformation = activitySamples;

  }

  obtainActivityUser(id) {
    return this.activityInformation.filter(userInfo => {
      if (userInfo.userID === id) {
        return userInfo
      }
    })
  }
  instantiateUserActivity(id) {
    return new UserActivity(this.obtainActivityUser(id));
  }

  findAverageFlightsOfStairsClimbedForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalFlightsOfStairsClimbed = specifiedDate.reduce((totalStairs, day) => {
      return totalStairs += day.flightsOfStairs
    }, 0)
    return Math.floor(totalFlightsOfStairsClimbed / specifiedDate.length)
  }

  findAverageNumberOfStepsTakenForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalNumberOfStepsTaken = specifiedDate.reduce((totalSteps, day) => {
      return totalSteps += day.numSteps
    }, 0)
    return Math.floor(totalNumberOfStepsTaken / specifiedDate.length)
  }

  findDateForActivity(specifiedDate) {
    return this.activityInformation.filter(day => day.date === specifiedDate)
  }
}

module.exports = ActivityRepository;
