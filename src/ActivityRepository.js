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
}

module.exports = ActivityRepository;
