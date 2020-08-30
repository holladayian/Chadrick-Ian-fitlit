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

  findAverageNumberOfStairsClimbedForADate(date) {
    this.findDateForActivity(date);

  }

  findDateForActivity(specifiedDate) {
    return this.activityInformation.filter(day => day.date === specifiedDate)
  }
}

module.exports = ActivityRepository;
